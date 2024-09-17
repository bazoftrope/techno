import connectToDatabase from '../../utils/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const client = await connectToDatabase();
    const database = client.db("technoDB");
    const mainCollection = database.collection('document');

    try {
      if (!req.body || !req.body.name) {
        return res.status(400).json({ message: "Отсутствуют необходимые данные в запросе" });
      }

      const { name } = req.body;
      // console.log(name, '<-----------name of document to retrieve api/document');

      const document = await mainCollection.findOne({ title: name });

      if (!document) {
        return res.status(404).json({ message: "Запись не найдена" });
      }
      const arrTitles = document.descripion
      // console.log(document, arrTitles, '--------------- документ для списка форм')

      res.status(200).json(arrTitles);

    } catch (error) {
      console.error('Ошибка при получении записи:', error);
      res.status(500).json({ message: "Ошибка при получении записи" });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
