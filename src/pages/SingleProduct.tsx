import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
  StandardSelectInput,
} from "../components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";

const SIZES = [
  { id: "xs", label: "XS" },
  { id: "sm", label: "SM" },
  { id: "m", label: "M" },
  { id: "lg", label: "LG" },
  { id: "xl", label: "XL" },
  { id: "2xl", label: "2XL" },
];

const emptyTeamSizes = () => Object.fromEntries(SIZES.map((s) => [s.id, 0]));

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);
  const [size, setSize] = useState<string>("xs");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);
  const [isTeamOrder, setIsTeamOrder] = useState(false);
  const [teamSizes, setTeamSizes] = useState<Record<string, number>>(emptyTeamSizes());
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // defining HOC instances
  const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();
      setSingleProduct(data);
    };

    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(
        addProductToTheCart({
          id: singleProduct.id + size + color,
          image: singleProduct.image,
          title: singleProduct.title,
          category: singleProduct.category,
          price: singleProduct.price,
          quantity,
          size,
          color,
          popularity: singleProduct.popularity,
          stock: singleProduct.stock,
        })
      );
      toast.success("Product added to the cart");
    }
  };

  const handleTeamAddToCart = () => {
    if (!singleProduct) return;
    const variants = SIZES.filter((s) => teamSizes[s.id] > 0).map((s) => ({
      id: singleProduct.id + s.id + color,
      image: singleProduct.image,
      title: singleProduct.title,
      category: singleProduct.category,
      price: singleProduct.price,
      quantity: teamSizes[s.id],
      size: s.id,
      color,
      popularity: singleProduct.popularity,
      stock: singleProduct.stock,
    }));
    if (variants.length === 0) {
      toast.error("Sélectionne au moins une taille");
      return;
    }
    variants.forEach((v) => dispatch(addProductToTheCart(v)));
    const total = variants.reduce((acc, v) => acc + v.quantity, 0);
    toast.success(`${total} article${total > 1 ? "s" : ""} ajouté${total > 1 ? "s" : ""} au panier`);
    setTeamSizes(emptyTeamSizes());
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={singleProduct?.image?.startsWith("http") || singleProduct?.image?.startsWith("/") ? singleProduct.image : `/assets/${singleProduct?.image}`}
            alt={singleProduct?.title}
          />
        </div>
        <div className="w-full flex flex-col gap-5 mt-9">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl">{singleProduct?.title}</h1>
            <div className="flex justify-between items-center">
              <p className="text-base text-secondaryBrown">
                {formatCategoryName(singleProduct?.category || "")}
              </p>
              <p className="text-base font-bold">{singleProduct?.price}€</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <SelectInputUpgrade
              selectList={[
                { id: "black", value: "BLACK" },
                { id: "red", value: "RED" },
                { id: "blue", value: "BLUE" },
                { id: "white", value: "WHITE" },
                { id: "rose", value: "ROSE" },
                { id: "green", value: "GREEN" },
              ]}
              value={color}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setColor(() => e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => setIsTeamOrder((v) => !v)}
              className="text-sm text-secondaryBrown underline text-left mt-1"
            >
              {isTeamOrder ? "Commander en individuel" : "Commander pour une équipe"}
            </button>

            {isTeamOrder ? (
              <div className="mt-1">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Quantités par taille
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => (
                    <div key={s.id} className="flex flex-col items-center gap-1">
                      <label className="text-xs font-semibold text-gray-600 uppercase">
                        {s.label}
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={teamSizes[s.id]}
                        onChange={(e) =>
                          setTeamSizes((prev) => ({
                            ...prev,
                            [s.id]: Math.max(0, parseInt(e.target.value) || 0),
                          }))
                        }
                        className="w-full h-9 text-center border border-gray-300 outline-none focus:border-gray-400 text-sm"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Total : {Object.values(teamSizes).reduce((a, b) => a + b, 0)} article
                  {Object.values(teamSizes).reduce((a, b) => a + b, 0) > 1 ? "s" : ""}
                  {" · "}
                  {Object.values(teamSizes).reduce((a, b) => a + b, 0) * (singleProduct?.price || 0)}€
                </p>
              </div>
            ) : (
              <>
                <SelectInputUpgrade
                  selectList={[
                    { id: "xs", value: "XS" },
                    { id: "sm", value: "SM" },
                    { id: "m", value: "M" },
                    { id: "lg", value: "LG" },
                    { id: "xl", value: "XL" },
                    { id: "2xl", value: "2XL" },
                  ]}
                  value={size}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSize(() => e.target.value)
                  }
                />
                <QuantityInputUpgrade
                  value={quantity}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(() => parseInt(e.target.value))
                  }
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Button
              mode="brown"
              text={isTeamOrder ? "Ajouter la commande équipe" : "Add to cart"}
              onClick={isTeamOrder ? handleTeamAddToCart : handleAddToCart}
            />
            <p className="text-secondaryBrown text-sm text-right">
              Delivery estimated on the Friday, July 26
            </p>
          </div>
          <div>
            {/* drowdown items */}
            <Dropdown dropdownTitle="Description">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
              quos deleniti, mollitia, vitae harum suscipit voluptatem quasi, ab
              assumenda accusantium rem praesentium accusamus quae quam tempore
              nostrum corporis eaque. Mollitia.
            </Dropdown>

            <Dropdown dropdownTitle="Product Details">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ad
              at odio illo, necessitatibus, reprehenderit dolore voluptas ea
              consequuntur ducimus repellat soluta mollitia facere sapiente.
              Unde provident possimus hic dolore.
            </Dropdown>

            <Dropdown dropdownTitle="Delivery Details">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga ad
              at odio illo, necessitatibus, reprehenderit dolore voluptas ea
              consequuntur ducimus repellat soluta mollitia facere sapiente.
              Unde provident possimus hic dolore.
            </Dropdown>
          </div>
        </div>
      </div>

      {/* similar products */}
      <div>
        <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center max-lg:text-4xl">
          Similar Products
        </h2>
        <div className="flex flex-wrap justify-between items-center gap-y-8 mt-12 max-xl:justify-start max-xl:gap-5 ">
          {products.slice(0, 3).map((product: Product) => (
            <ProductItem
              key={product?.id}
              id={product?.id}
              image={product?.image}
              title={product?.title}
              category={product?.category}
              price={product?.price}
              popularity={product?.popularity}
              stock={product?.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
