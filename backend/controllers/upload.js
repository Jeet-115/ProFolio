export const uploadImage = (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  res.status(200).json({ url: req.file.path });
};
