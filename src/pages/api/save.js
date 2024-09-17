// import connectToDatabase from '../../utils/db';

// export default async function handler(req, res) {
//   console.log(req.body, 'reqbody in SAVE')
//   console.log(req.query, 'quere in SAVE')

//   const { collection } = req.query

//   if (req.method === 'POST') {
//     const client = await connectToDatabase()
//     const database = client.db("technoDB");
//     const coll = database.collection(collection);
//     const result = await coll.insertOne(req.body);
//     client.close();
//     console.log(result, 'result in save')

//     res.status(200).json({ success: true, data: { insertedId: result.insertedId.toString() } });
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }

import connectToDatabase from '../../utils/db';

export default async function handler(req, res) {
  console.log(req.body, 'reqbody in SAVE')
  console.log(req.query, 'query in SAVE')

  const { collection } = req.query

  if (req.method === 'POST') {
    try {
      const client = await connectToDatabase()
      const database = client.db("technoDB");
      const coll = database.collection(collection);

      // Получаем результат вставки
      const result = await coll.insertOne(req.body);

      // Получаем сохраненную запись из результатов вставки
      const savedRecord = await coll.findOne({ _id: result.insertedId });
      console.log(savedRecord, 'только что созданная запись')

      client.close();

      // Возвращаем сохраненную запись
      res.status(200).json({
        success: true,
        data: savedRecord
      });
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
      res.status(500).json({ message: 'Ошибка при сохранении данных' });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}




