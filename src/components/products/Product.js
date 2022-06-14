import Spinner from "../functional/Spinner";


function Product(props) {

    let products = props.products;

    let content = <Spinner/>;

    if (products) {
        content = products.map((item, index) => {
            return (
                <div className="card" key={index}>
                    <img src={item.thumbnail} className="card-img-top" alt={item.title}/>
                    <div className="card-body">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.description}</p>
                        <div className="btn btn-primary">Buy now</div>
                    </div>
                </div>
            );
        })
    }

    return content;

}

export default Product;