class Node {
  constructor(title, link, component) {
    this.title = title;
    this.link = link;
    this.component = component;
    this.children = [];
  }
  addChild(child) {
    this.children.push(child);
  }
}

const root = new Node("Inicio", "/", "HomeComponent");

// Hijos de Inicio
const productos = new Node("Productos", "/productos", "ProductosComponent");
const servicios = new Node("Servicios", "/servicios", "ServiciosComponent");
const contacto = new Node("Contacto", "/contacto", "ContactoComponent");

// Submenús de productos
const electronicos = new Node("Electrónicos", "/productos/electronicos", "ElectronicosComponent");
const ropa = new Node("Ropa", "/productos/ropa", "RopaComponent");
productos.addChild(electronicos);
productos.addChild(ropa);

// Submenús de servicios
const soporte = new Node("Soporte Técnico", "/servicios/soporte", "SoporteComponent");
const mantenimiento = new Node("Mantenimiento", "/servicios/mantenimiento", "MantenimientoComponent");
servicios.addChild(soporte);
servicios.addChild(mantenimiento);

// Agregamos hijos al nodo raíz (Inicio)
root.addChild(productos);
root.addChild(servicios);
root.addChild(contacto);

export default root;
