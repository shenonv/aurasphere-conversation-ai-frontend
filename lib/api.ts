// API service for communicating with the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface UploadInitiateResponse {
  message: string;
  storage_path: string;
}

export interface UploadNotifyResponse {
  message: string;
  upload_id: string;
}

export interface UploadStatus {
  id: string;
  storage_path: string;
  file_name: string;
  status: 'processing' | 'completed' | 'failed';
  transcript?: string;
  summary?: string;
  created_at: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Initiate upload and get storage path
  async initiateUpload(fileType: 'audio' | 'video' = 'audio'): Promise<UploadInitiateResponse> {
    const response = await fetch(`${this.baseUrl}/uploads/initiate?file_type=${fileType}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to initiate upload: ${response.statusText}`);
    }

    return response.json();
  }

  // Notify backend about completed upload
  async notifyUpload(storagePath: string): Promise<UploadNotifyResponse> {
    const response = await fetch(`${this.baseUrl}/uploads/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storage_path: storagePath,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to notify upload: ${response.statusText}`);
    }

    return response.json();
  }

  // Upload file to Supabase storage
  async uploadToSupabase(file: File, storagePath: string): Promise<void> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing');
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.storage
      .from('media-uploads')
      .upload(storagePath, file);

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  // Get upload status
  async getUploadStatus(uploadId: string): Promise<UploadStatus> {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing');
    }

    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
      .from('uploads')
      .select('*')
      .eq('id', uploadId)
      .single();

    if (error) {
      throw new Error(`Failed to get upload status: ${error.message}`);
    }

    return data;
  }

  // Complete upload process: initiate -> upload to storage -> notify backend
  async uploadFile(file: File): Promise<{ uploadId: string; storagePath: string }> {
    try {
      // Determine file type
      const fileType = file.type.startsWith('video/') ? 'video' : 'audio';
      
      // Step 1: Initiate upload with backend
      const initiateResponse = await this.initiateUpload(fileType);
      const storagePath = initiateResponse.storage_path;

      // Step 2: Upload file to Supabase storage
      await this.uploadToSupabase(file, storagePath);

      // Step 3: Notify backend that upload is complete
      const notifyResponse = await this.notifyUpload(storagePath);

      return {
        uploadId: notifyResponse.upload_id,
        storagePath,
      };
    } catch (error) {
      throw new Error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const apiService = new ApiService();
