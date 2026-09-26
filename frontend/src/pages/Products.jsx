import "./Products.css";
import { Search, Plus, Package, Edit3 } from "lucide-react";

function Products() {
  return (
    <div className="products-page">

      {/* Background Glow */}
      <div className="products-glow products-glow-one"></div>
      <div className="products-glow products-glow-two"></div>


      <main className="products-container">

        {/* Header */}
        <section className="products-header">

          <div>
            <p className="page-label">
              INVENTORY MANAGEMENT
            </p>

            <h1>
              Products
            </h1>

            <p className="page-description">
              Create and manage product information, categories and reorder rules.
            </p>
          </div>


          <button className="add-product-btn">
            <Plus size={18}/>
            Add Product
          </button>

        </section>



        {/* Toolbar */}
        <section className="products-toolbar">

          <div className="search-box">

            <Search size={18}/>

            <input
              type="text"
              placeholder="Search products or SKU..."
            />

          </div>


          <select>
            <option>
              All Categories
            </option>
          </select>


          <select>
            <option>
              All Status
            </option>
          </select>

        </section>



        {/* Product Table */}

        <section className="products-card">


          <div className="table-header">

            <span>SKU</span>
            <span>PRODUCT</span>
            <span>CATEGORY</span>
            <span>REORDER RULE</span>
            <span>STATUS</span>
            <span>ACTION</span>

          </div>



          {/* Empty State */}

          <div className="empty-products">

            <div className="empty-icon">
              <Package size={32}/>
            </div>


            <h3>
              No products available
            </h3>


            <p>
              Product records will appear here once connected to the backend.
            </p>

          </div>


        </section>




        {/* Add Product Form */}

        <section className="product-form-card">


          <div className="form-heading">

            <h2>
              Add Product
            </h2>

            <p>
              Product creation form ready for backend integration.
            </p>

          </div>



          <div className="form-grid">


            <div className="form-group">

              <label>
                Product Name
              </label>

              <input
                placeholder="Enter product name"
              />

            </div>



            <div className="form-group">

              <label>
                SKU
              </label>

              <input
                placeholder="Enter SKU"
              />

            </div>



            <div className="form-group">

              <label>
                Category
              </label>

              <input
                placeholder="Enter category"
              />

            </div>



            <div className="form-group">

              <label>
                Reorder Level
              </label>

              <input
                placeholder="Enter reorder level"
              />

            </div>


          </div>



          <div className="form-actions">

            <button className="cancel-btn">
              Cancel
            </button>


            <button className="save-btn">
              Save Product
            </button>

          </div>


        </section>


      </main>

    </div>
  );
}


export default Products;