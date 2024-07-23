import {Card} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {useDispatch} from "react-redux";
import {createPayment} from "@/redux/payment/Action.js";

const SubscriptionCard = ({ data }) =>
{
    const dispatch = useDispatch();

    const handleUpgrade = () =>
    {
        const planType = data.planType;
        const jwt = localStorage.getItem("jwt");

        if (!planType)
        {
            console.error("Plan type is undefined");
            return;
        }

        if (!jwt)
        {
            console.error("JWT is undefined or not found in localStorage");
            return;
        }

        console.log(`Upgrading plan: ${planType}`);
        dispatch(createPayment({ planType, jwt }));
    };
    return (
        <div className="rounded-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem]">
            <p>{data.planName}</p>
            <p>
                <span className="text-xl font-semibold">₹{data.price}/</span>
                <span>{data.planType}</span>
            </p>
            {data.planType === "ANNUALLY" && <p className="text-green-500">30% off</p> }

            <Button className="w-full" onClick={handleUpgrade}>
                {data.buttonName}
            </Button>

            <div>
                <div>

                    {data.features.map(item =>
                        <div className="flex items-center gap-2">
                            <CheckCircledIcon />
                            <p key={item}>{item}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionCard;