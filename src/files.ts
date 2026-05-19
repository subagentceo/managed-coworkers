/**
 * File Operations
 * 
 * Attach and download files for agent sessions
 */

export interface FileMetadata {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  uploadedAt: number;
  sessionId: string;
}

export interface FileDownloadRequest {
  fileId: string;
  sessionId: string;
}

export interface FileUploadRequest {
  sessionId: string;
  filename: string;
  content: Buffer | string;
  mimeType?: string;
}

/**
 * @deprecated since=2026-05-18 reason="Rubric remnant from commit 365a298;
 *   not in replay path. Kept until baseline scoring confirms no
 *   consumers. Slated for deletion after MD12."
 *
 * FileManager - Handles file operations in agent sessions
 */
export class FileManager {
  private files: Map<string, FileMetadata> = new Map();
  private fileContent: Map<string, Buffer> = new Map();

  /**
   * Upload file to session
   */
  async uploadFile(request: FileUploadRequest): Promise<FileMetadata> {
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const buffer = typeof request.content === 'string' 
      ? Buffer.from(request.content) 
      : request.content;

    const metadata: FileMetadata = {
      id: fileId,
      name: request.filename,
      mimeType: request.mimeType || 'application/octet-stream',
      size: buffer.length,
      uploadedAt: Date.now(),
      sessionId: request.sessionId,
    };

    this.files.set(fileId, metadata);
    this.fileContent.set(fileId, buffer);

    return metadata;
  }

  /**
   * Download file from session
   */
  async downloadFile(request: FileDownloadRequest): Promise<Buffer> {
    const content = this.fileContent.get(request.fileId);
    if (!content) {
      throw new Error(`File not found: ${request.fileId}`);
    }

    const metadata = this.files.get(request.fileId);
    if (metadata?.sessionId !== request.sessionId) {
      throw new Error('File access denied');
    }

    return content;
  }

  /**
   * List files in session
   */
  listFiles(sessionId: string): FileMetadata[] {
    return Array.from(this.files.values()).filter(f => f.sessionId === sessionId);
  }

  /**
   * Get file metadata
   */
  getFile(fileId: string): FileMetadata | undefined {
    return this.files.get(fileId);
  }

  /**
   * Delete file
   */
  deleteFile(fileId: string): boolean {
    this.fileContent.delete(fileId);
    return this.files.delete(fileId);
  }

  /**
   * Get file size
   */
  getFileSize(fileId: string): number | undefined {
    return this.files.get(fileId)?.size;
  }

  /**
   * Validate file before upload
   */
  validateFile(filename: string, size: number, maxSizeBytes: number = 100 * 1024 * 1024): { valid: boolean; error?: string } {
    if (!filename) {
      return { valid: false, error: 'Filename is required' };
    }

    if (size > maxSizeBytes) {
      return { valid: false, error: `File size exceeds maximum of ${maxSizeBytes} bytes` };
    }

    return { valid: true };
  }
}

export default FileManager;
