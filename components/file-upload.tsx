"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
	Upload,
	type File,
	X,
	CheckCircle,
	AlertCircle,
	Mic,
	Video,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { apiService } from "@/lib/api";

type UploadedFile = {
	file: File;
	id: string;
	uploadId?: string;
	progress: number;
	status: "uploading" | "processing" | "completed" | "error";
	type: "audio" | "video";
	summary: string;
	createdAt: string;
	error?: string;
};

type Segment = {
	id: string;
	topic_label: string;
};

// type Props = {
// 	upload: Upload;
// 	onBack: () => void;
// };

export function FileUpload() {
	const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		const newFiles: UploadedFile[] = acceptedFiles.map((file) => ({
			file,
			id: Math.random().toString(36).substr(2, 9),
			progress: 0,
			status: "uploading",
			type: file.type.startsWith("video/") ? "video" : "audio",
			createdAt: new Date().toLocaleString(),
			summary: "Analysis will be added later",
		}));

		setUploadedFiles((prev) => [...prev, ...newFiles]);

		// Upload files to backend
		newFiles.forEach((uploadFile) => {
			uploadFileToBackend(uploadFile);
		});
	}, []);

	const uploadFileToBackend = async (uploadFile: UploadedFile) => {
		try {
			// Update progress to show upload starting
			setUploadedFiles((prev) =>
				prev.map((file) =>
					file.id === uploadFile.id
						? { ...file, progress: 10, status: "uploading" }
						: file
				)
			);

			// Upload file to backend
			const result = await apiService.uploadFile(uploadFile.file);

			// Update with upload ID and progress
			setUploadedFiles((prev) =>
				prev.map((file) =>
					file.id === uploadFile.id
						? { 
							...file, 
							uploadId: result.uploadId,
							progress: 50, 
							status: "processing" 
						}
						: file
				)
			);

			// Start polling for status updates
			pollUploadStatus(uploadFile.id, result.uploadId);

		} catch (error) {
			setUploadedFiles((prev) =>
				prev.map((file) =>
					file.id === uploadFile.id
						? { 
							...file, 
							status: "error",
							error: error instanceof Error ? error.message : "Upload failed"
						}
						: file
				)
			);
		}
	};

	const pollUploadStatus = async (fileId: string, uploadId: string) => {
		const pollInterval = setInterval(async () => {
			try {
				const status = await apiService.getUploadStatus(uploadId);
				
				setUploadedFiles((prev) =>
					prev.map((file) => {
						if (file.id === fileId) {
							const updatedFile = { ...file };
							
							if (status.status === "processing") {
								updatedFile.progress = 75;
								updatedFile.status = "processing";
							} else if (status.status === "completed") {
								updatedFile.progress = 100;
								updatedFile.status = "completed";
								updatedFile.summary = status.summary || "Analysis completed";
								clearInterval(pollInterval);
							} else if (status.status === "failed") {
								updatedFile.status = "error";
								updatedFile.error = "Processing failed";
								clearInterval(pollInterval);
							}
							
							return updatedFile;
						}
						return file;
					})
				);
			} catch (error) {
				console.error("Error polling upload status:", error);
				// Continue polling on error, but log it
			}
		}, 2000); // Poll every 2 seconds

		// Stop polling after 5 minutes
		setTimeout(() => clearInterval(pollInterval), 300000);
	};

	const removeFile = (fileId: string) => {
		setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"audio/*": [".mp3", ".wav", ".m4a", ".aac"],
			"video/*": [".mp4", ".mov", ".avi", ".mkv"],
		},
		maxSize: 500 * 1024 * 1024, // 500MB
	});

	return (
		<div className="space-y-6">
			{/* Upload Area */}
			<Card>
				<CardHeader>
					<CardTitle>Upload Files</CardTitle>
					<CardDescription>
						Drag and drop your audio or video files here, or click
						to browse
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div
						{...getRootProps()}
						className={cn(
							"border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
							isDragActive
								? "border-primary bg-primary/5"
								: "border-border hover:border-primary/50 hover:bg-muted/50"
						)}
					>
						<input {...getInputProps()} />
						<Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
						{isDragActive ? (
							<p className="text-lg font-medium text-primary">
								Drop the files here...
							</p>
						) : (
							<div className="space-y-2">
								<p className="text-lg font-medium">
									Drop files here or click to upload
								</p>
								<p className="text-sm text-muted-foreground">
									Supports MP3, WAV, MP4, MOV, AVI (max 500MB
									per file)
								</p>
							</div>
						)}
					</div>
				</CardContent>
			</Card>

			{/* Uploaded Files */}
			{uploadedFiles.length > 0 && (
				<Card>
					<CardHeader>
						<CardTitle>Upload Progress</CardTitle>
						<CardDescription>
							Track the progress of your file uploads and
							processing
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{uploadedFiles.map((uploadFile) => (
							<div
								key={uploadFile.id}
								className="flex items-center space-x-4 p-4 border rounded-lg"
							>
								<div className="flex-shrink-0">
									{uploadFile.type === "video" ? (
										<Video className="h-8 w-8 text-chart-3" />
									) : (
										<Mic className="h-8 w-8 text-chart-2" />
									)}
								</div>

								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between mb-2">
										<p className="text-sm font-medium truncate">
											{uploadFile.file.name}
										</p>
										<div className="flex items-center space-x-2">
											<Badge
												variant={
													uploadFile.type === "video"
														? "secondary"
														: "outline"
												}
											>
												{uploadFile.type}
											</Badge>
											<Button
												variant="ghost"
												size="sm"
												onClick={() =>
													removeFile(uploadFile.id)
												}
												className="h-6 w-6 p-0"
											>
												<X className="h-4 w-4" />
											</Button>
										</div>
									</div>

									<div className="flex items-center space-x-2">
										{uploadFile.status === "uploading" && (
											<>
												<Progress
													value={uploadFile.progress}
													className="flex-1"
												/>
												<span className="text-xs text-muted-foreground">
													{uploadFile.progress}%
												</span>
											</>
										)}

										{uploadFile.status === "processing" && (
											<>
												<div className="flex-1 bg-secondary/20 rounded-full h-2">
													<div
														className="bg-secondary h-2 rounded-full animate-pulse"
														style={{ width: "60%" }}
													/>
												</div>
												<span className="text-xs text-muted-foreground">
													Processing...
												</span>
											</>
										)}

										{uploadFile.status === "completed" && (
											<div className="flex items-center space-x-2 text-chart-2">
												<CheckCircle className="h-4 w-4" />
												<span className="text-xs">
													Ready for analysis
												</span>
											</div>
										)}

										{uploadFile.status === "error" && (
											<div className="flex items-center space-x-2 text-destructive">
												<AlertCircle className="h-4 w-4" />
												<span className="text-xs">
													{uploadFile.error || "Upload failed"}
												</span>
											</div>
										)}
									</div>

									<p className="text-xs text-muted-foreground mt-1">
										{(
											uploadFile.file.size /
											1024 /
											1024
										).toFixed(2)}{" "}
										MB
									</p>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
			)}
		</div>
	);
}
