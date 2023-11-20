import React, {useState} from "react";
import { Image, Button } from "react-bootstrap";

export const ImageUpload = ({ token }) => {
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleUpload = async () => {
        if (!file) {
            console.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            //Add actual API endpoint and remove localhost when ready
            const response = await fetch('http://ALBV2-640718364.us-east-1.elb.amazonaws.com/movies/images', {
            // const response = await fetch('http://54.235.21.139/movies/images', {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            if (response.ok) {
                const imageData = await response.json();
                console.log("Upload successful", imageData);
            } else {
                alert("Failed");
            } 
        } catch (error) {
            console.log(error)
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files && event.target.files[0];
        setFile(selectedFile);

        const previewURL = selectedFile ? URL.createObjectURL(selectedFile) : null;
        setImagePreview(previewURL);
    }

    return (
        <>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
            />
            <Button 
                className="mt-2 mb-2 ms-2" 
                onClick={handleUpload}
                disabled={!file}
            >
                Upload
            </Button>
            {imagePreview && (
                <div>
                    <Image
                        src={imagePreview}
                        alt="Uploaded Preview"
                        className="mt-2 mb-2 ms-2"
                        thumbnail
                    />
                    <a
                        href={imagePreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 mb-2 ms-2"
                    >
                        Open Original Image
                    </a>
                </div>
            )}
        </>
    )
}