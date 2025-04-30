
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { removeBackground } from '@/utils/imageProcessing';

interface TempImageUploaderProps {
  onImageUpdate?: (imageUrl: string | null) => void;
}

const TempImageUploader: React.FC<TempImageUploaderProps> = ({ onImageUpdate }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);
  const [showRemoveBg, setShowRemoveBg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setProcessingError(null);
    
    if (file) {
      setIsProcessing(true);
      try {
        // Convert the file to a data URL
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setUploadedImage(imageUrl);
          if (onImageUpdate) onImageUpdate(imageUrl);
          setShowRemoveBg(true);
          setIsProcessing(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Error processing image:", error);
        setProcessingError("Error processing the image. Please try another file.");
        setIsProcessing(false);
      }
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setShowRemoveBg(false);
    if (onImageUpdate) onImageUpdate(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };
  
  const handleRemoveBackground = async () => {
    if (!uploadedImage) return;
    
    setIsProcessing(true);
    setProcessingError(null);
    
    try {
      const img = new Image();
      img.onload = async () => {
        try {
          const blob = await removeBackground(img);
          const blobUrl = URL.createObjectURL(blob);
          setUploadedImage(blobUrl);
          if (onImageUpdate) onImageUpdate(blobUrl);
          setIsProcessing(false);
        } catch (error) {
          console.error("Error removing background:", error);
          setProcessingError("Background removal failed. Please try another image.");
          setIsProcessing(false);
        }
      };
      img.onerror = () => {
        setProcessingError("Failed to load the image for processing.");
        setIsProcessing(false);
      };
      img.src = uploadedImage;
    } catch (error) {
      console.error("Error in background removal process:", error);
      setProcessingError("An unexpected error occurred during background removal.");
      setIsProcessing(false);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-blue-400">Try With Your Photo</h3>
      
      <Card className="bg-blue-900/10 border border-blue-900/30 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="outline" 
                onClick={triggerFileInput}
                disabled={isProcessing}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                Upload Image
              </Button>
              
              {showRemoveBg && (
                <Button 
                  variant="outline"
                  onClick={handleRemoveBackground}
                  disabled={isProcessing || !uploadedImage}
                >
                  Remove Background
                </Button>
              )}
              
              {uploadedImage && (
                <Button 
                  variant="outline"
                  onClick={handleRemoveImage}
                  className="text-red-400 border-red-400 hover:bg-red-950/20"
                >
                  <X size={16} className="mr-2" />
                  Remove
                </Button>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
            </div>
            
            {isProcessing && (
              <div className="flex items-center gap-2 text-blue-400">
                <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                Processing...
              </div>
            )}
            
            {processingError && (
              <div className="text-red-400 text-sm">{processingError}</div>
            )}
            
            {uploadedImage ? (
              <div className="mt-4 flex justify-center">
                <img 
                  src={uploadedImage} 
                  alt="Uploaded preview" 
                  className="max-h-[300px] max-w-full object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div className="mt-4 bg-blue-900/5 border border-dashed border-blue-900/20 rounded-lg p-8 flex flex-col items-center justify-center text-center">
                <ImageIcon size={48} className="text-blue-900/30 mb-4" />
                <p className="text-blue-400">Upload an image to see how this product would look with your own photo</p>
                <p className="text-sm text-gray-400 mt-2">Supported formats: JPEG, PNG</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TempImageUploader;
