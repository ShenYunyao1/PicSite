// frontend/src/components/PhotoUpload.js
import React from 'react';

const PhotoUpload = () => {
    const handleUpload = (event) => {
        // 上传逻辑...
    };

    return (
        <input type="file" multiple onChange={handleUpload} />
    );
};

export default PhotoUpload;