import React, {useState} from "react";
import { Container } from "semantic-ui-react";
import ProductCollection from "./ProductCollection";
import Search from "./Search";

function ProductPage({ products }) {
    const [query, setQuery] = useState("");
    const productsToDisplay = products.filter((product) => product.name.includes(query));

    return (
        <div className="productpage-container">
            <Container>
                <h1 className="header">Products</h1>
                <Search query={query} onQuery={setQuery} />
                <br />
                <ProductCollection products={productsToDisplay} />
            </Container>
        </div>
    );
}

export default ProductPage;