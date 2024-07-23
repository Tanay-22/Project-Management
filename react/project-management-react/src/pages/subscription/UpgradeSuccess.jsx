import {Card} from "@/components/ui/card.jsx";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUserSubscription, upgradeSubscription} from "@/redux/Subscription/Action.js";

const UpgradeSuccess = () =>
{
    const navigate = useNavigate();
    const subscription = useSelector(store => store.subscription);
    const dispatch = useDispatch();

    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");
    const planType = queryParams.get("planType");

    useEffect(() =>
    {
        dispatch(upgradeSubscription({ planType }));
        dispatch(getUserSubscription());
    }, []);

    return (
        <div className="flex justify-center">
            <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">

                <div className="flex items-center gap-4">

                    <CheckCircledIcon className="h-9 w-9 text-green-500" />
                    <p className="text-xl">Plan Upgraded Successfully</p>
                </div>
                <div className="space-y-3">
                    <p className="text-green-500">Start Date : ${subscription.userSubscription?.startDate}</p>
                    <p className="text-red-500">End Date : ${subscription.userSubscription?.endDate}</p>
                    <p className="">Plan Type : ${subscription.userSubscription?.planType}</p>
                </div>
                <Button onClick={() => navigate("/")}>Go to home</Button>
            </Card>
        </div>
    );
};

export default UpgradeSuccess;