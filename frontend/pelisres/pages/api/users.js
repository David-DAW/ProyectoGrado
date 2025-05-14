import getConnection from '../../lib/db'; 

export default async function handler(req, res) {
  console.log('Handler llamado'); 

  if (req.method === 'GET') {
    let connection;
    try {
      console.log('Intentando obtener conexión desde el pool');
      connection = await getConnection(); 
      console.log('Conexión obtenida', connection.threadId);

      if (!connection) {
        console.log('No se pudo obtener la conexión');
        return res.status(500).json({ error: 'No se pudo conectar a la base de datos' });
      }

      const [rows] = await connection.execute('SELECT * FROM users');
      console.log('Consulta ejecutada', rows);
      res.status(200).json(rows);

    } catch (error) {
      console.error('Error en try:', error);
      return res.status(500).json({ error: 'Error al conectar o consultar la base de datos' });
    } finally {
      console.log('Bloque finally');
    }
  } else {
    console.log('Método no permitido');
    res.status(405).json({ error: 'Método no permitido' });
  }
}
