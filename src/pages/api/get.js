import connectToDatabase from '../../utils/db';
import { ObjectId } from 'mongodb'; // Добавлено здесь

export default async function handler(req, res) {

  if (req.method === 'POST') {
    console.log(req.body, '--------------reqbody in gethandler')
    const { col } = req.body
    const client = await connectToDatabase();
    const database = client.db("technoDB");
    const collection = database.collection(col);

    try {
      const products = await collection.find().toArray();
      console.log(products, 'produts what we get in get.js')
      client.close();
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  if (req.method === 'DELETE') {
    const { id, coll } = req.body
    console.log(id, coll, '--------------reqbody in gethandler DELETE')

    const client = await connectToDatabase();
    const database = client.db("technoDB");
    const collection = database.collection(coll);

    try {
      // Используйте строку идентификатора напрямую, без создания нового ObjectId
      const currentid = new ObjectId(id)
      const result = await collection.deleteOne({ _id: currentid });
      client.close();

      if (result.deletedCount > 0) {
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  }

}
