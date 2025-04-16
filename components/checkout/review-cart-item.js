import Link from "next/link";

function ReviewCartItem({ item }) {
  if (!item) {
    return <div className="text-muted">No item data available</div>;
  }

  const { id, name = "Product name here", price = "0", quantity = 1, size = "Medium", color = "White" } = item;

  return (
    <div className="d-flex">
      <div className="flex-shrink-0">
        <img
          className="rounded"
          src={item.image_urls?.[0] ?? item.media?.[0]?.original_url}
          width={80}
          height={80}
          alt={`${name} image`}
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-grow-1 ms-3 h-100">
        <div className="vstack">
          <Link href={`/product/${item.id}`}>
            <a className="text-dark text-decoration-none">{item.name}</a>
          </Link>
          <h6 className="mb-0">{`${item.quantity} × ${parseFloat(item.price).toLocaleString()}`}</h6>
        </div>
      </div>
    </div>
  );
}

export default ReviewCartItem;
