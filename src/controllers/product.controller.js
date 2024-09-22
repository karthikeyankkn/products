const db = require("../config/database");

// ==> Método responsável por criar um novo 'Product':

exports.createProduct = async (req, res) => {
  const { productname, quantity, price, isactive } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (productname, quantity, price, isactive) VALUES ($1, $2, $3, $4)",
    [productname, quantity, price, isactive]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { productname, quantity, price, isactive }
    },
  });
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllProducts = async (req, res) => {
  const response = await db.query('SELECT * FROM products ORDER BY isActive DESC, productId DESC');
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Id':
exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await db.query('SELECT * FROM products WHERE productid = $1', [productId]);
  res.status(200).send(response.rows);
}

// ==> Método responsável por atualizar um 'Product' pelo 'Id':
exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { productname, quantity, price, isactive } = req.body;

  const response = await db.query(
    "UPDATE products SET productname = $1, quantity = $2, price = $3, isactive = $4 WHERE productId = $5",
    [productname, quantity, price, isactive, productId]
  );

  res.status(200).send({ message: "Product Updated Successfully!" });
};

// ==> Método responsável por excluir um 'Product' pelo 'Id':
exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await db.query('DELETE FROM products WHERE productId = $1', [
    productId
  ]);

  res.status(200).send({ message: 'Product deleted successfully!', productId });
};