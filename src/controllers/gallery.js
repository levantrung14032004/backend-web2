import * as galleryService from '../services/gallery.js';
export const add_thumbnail = async (req, res) => {
    try {
        const product_id = req.body.product_id;
        const url_image = req.body.url_image;
        const result = await galleryService.add_thumbnail(product_id, url_image);
        if (result.error) {
        res.status(400).json(result.message);
        } else {
        res.status(200).json(result.message);
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}
