// pages/api/collections.js

import connectToDatabase from '../../utils/db';

// Обработчик для создания коллекции
export async function createCollectionHandler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const client = await connectToDatabase();
  const database = client.db("technoDB");
  const mainCollection = database.collection('document')

  try {
    const { name, schema } = req.body;
    const schemaArr = schema.split(',')
    console.log(name, schema, schemaArr, '<----------------------------NEW collection')


    await mainCollection.insertOne({ title: name, descripion: schemaArr });
    const collection = await database.createCollection(name);

    res.status(200).json({ success: true, message: "Коллекция успешно создана" });

  } catch (error) {
    console.error('Ошибка при создании коллекции:', error);
    res.status(500).json({ message: "Ошибка при создании коллекции" });
  }
}

// Обработчик для получения списка всех коллекций
export async function getAllCollectionsHandler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const client = await connectToDatabase();
  const database = client.db("technoDB");

  try {
    const collections = await database.listCollections().toArray();
    const collectionNames = collections.map(collection => collection.name);
    console.log(collectionNames, 'get collections')
    res.status(200).json(collectionNames);

  } catch (error) {
    console.error('Ошибка при получении списка коллекций:', error);
    res.status(500).json({ message: "Ошибка при получении списка коллекций" });
  }
}

// Функция для удаления коллекции
export async function deleteCollectionHandler(req, res) {
  if (req.method !== 'DELETE') {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const client = await connectToDatabase();
  const database = client.db("technoDB");
  const documentCollection = database.collection("document");


  try {
    const { name } = req.body; // Получаем имя коллекции из тела запроса
    console.log(req.body, 'collection to delete');

    if (documentCollection) {
      console.log(documentCollection, 'documentcollection')
      const removeResult = await documentCollection.deleteOne({ title: name });
      console.log(removeResult, 'result in delete document');
    } else {
      console.error("Коллекция document не найдена");
    }

    const result = await database.collection(name).drop(); // Удаляем коллекцию
    console.log(result, 'result in delitecollection')

    res.status(200).json({ success: true, message: "Коллекция успешно удалена" });

  } catch (error) {
    console.error('Ошибка при удалении коллекции:', error);
    res.status(500).json({ message: "Ошибка при удалении коллекции" });
  }
}


// Главный обработчик, который перенаправляет запросы к соответствующим функциям
export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return createCollectionHandler(req, res);
    case 'GET':
      return getAllCollectionsHandler(req, res);
    case 'DELETE':
      return deleteCollectionHandler(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
