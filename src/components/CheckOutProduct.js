import { StarIcon } from "@heroicons/react/solid";
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, selectItems, updateAmount } from "../slices/basketSlice";

const { default: Image } = require("next/image")

function CheckOutProduct({ id, title, price, desctiption, category, image, rating, hasPrime, amount }) {
    const items = useSelector(selectItems);
    const dispatch = useDispatch();

    const increaseAmount = () => {
        let newAmount = amount+1;
        dispatch(updateAmount({
            id: id,
            amount: newAmount,
        }));
        console.log("Id: "+id);
        console.log("Amount: "+newAmount);
        console.log(items);
    }

    const decreaseAmount = () => {
        let newAmount = amount - 1;
        if(newAmount<=0){
            dispatch(removeFromBasket({
               id
            }))
        }
        else {
            dispatch(updateAmount({
                id: id,
                amount: newAmount,
            }))
        }
    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}));
    }
 
 
    return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs mt-2 my-2 line-clamp-3">{desctiption}</p>
        <div className="mb-5">
          <Currency quantity={price} currency="USD" />
        </div>

        {hasPrime && (
          <div className="flex items-center space-x-2 -mt-5">
            <img
              loading="lazy"
              className="w-12"
              src="https://links.papareact.com/fdw"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

        {/* Right add/remove*/}
        <div className="flex flex-col space-y-2 my-auto justify-self-end">
          <div className="flex flex-row space-x-2 items-center">
              <button onClick={decreaseAmount} className="button">{"-"}</button>
                <span className="p-2">{amount}</span>
              <button onClick={increaseAmount} className="button">{"+"}</button>
          </div>
        <button onClick={removeItemFromBasket} className="button">Remove</button>
      </div>
    </div>
  );
}

export default CheckOutProduct
