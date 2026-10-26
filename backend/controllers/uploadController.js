export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const relativeUrl = `/uploads/${req.file.filename}`;
    const fullUrl = `${req.protocol}://${req.get('host')}${relativeUrl}`;

    return res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      fileName: req.file.filename,
      relativeUrl,
      fullUrl
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ success: false, message: 'Upload Failed', error: error.message });
  }
};
