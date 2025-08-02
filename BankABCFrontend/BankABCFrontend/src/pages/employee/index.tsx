import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { User, CreditCard, Banknote } from "lucide-react";
import { useEffect, useState } from "react";


export default function Dashboard() {
    // const navigate = useNavigate();
    const { getCookie,user } = useAuth();
    const [accountDetails, setAccountDetails]=useState({
        empName: "",
        email: "",
            phone: "",
            branchName: "",
    })

   
    useEffect(()=>{
        const fetchData=async()=>{
const { data } = await axios.get(
                    `http://localhost:8080/api/employee/employees/${user?.empId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie("auth_token")}`,
                        },
                    },
                );

                setAccountDetails(data)
        }
        fetchData()


    },[])

 

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">
                    Welcome back! Here's your account overview.
                </p>
            </div>

          

            {/* Account Info Section */}
            <Card className="border-blue-200">
                <CardHeader>
                    <CardTitle className="text-gray-900">
                        Account Info
                    </CardTitle>
                    <CardDescription>
                        Your personal and account details
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Employee Name
                            </p>
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-gray-900">
                                    {accountDetails.empName}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Employee Email
                            </p>
                            <div className="flex items-center gap-2">
                                <CreditCard className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-gray-900">
                                    {accountDetails.email}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Employee Phone
                            </p>
                            <div className="flex items-center gap-2">
                                <Banknote className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-gray-900">
                                    {accountDetails.phone}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">Branch Name</p>
                            <div className="flex items-center gap-2">
                                <Banknote className="h-4 w-4 text-blue-600" />
                                <span className="font-medium text-gray-900">
                                    {accountDetails.branchName}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Make changes according to the need of the employee dashboard */}
            {/* Recent Transactions */}
            {/* <Card className="border-blue-200">
                <CardHeader>
                    <CardTitle className="text-gray-900">
                        Recent Transactions
                    </CardTitle>
                    <CardDescription>
                        Your latest account activity
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            {
                                description: "Salary Deposit",
                                amount: "+$3,500.00",
                                date: "Today",
                                type: "credit",
                            },
                            {
                                description: "Grocery Store",
                                amount: "-$127.45",
                                date: "Yesterday",
                                type: "debit",
                            },
                            {
                                description: "Electric Bill",
                                amount: "-$89.32",
                                date: "2 days ago",
                                type: "debit",
                            },
                            {
                                description: "ATM Withdrawal",
                                amount: "-$200.00",
                                date: "3 days ago",
                                type: "debit",
                            },
                        ].map((transaction, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {transaction.description}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        {transaction.date}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p
                                        className={`font-semibold ${
                                            transaction.type === "credit"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {transaction.amount}
                                    </p>
                                    <Badge
                                        variant={
                                            transaction.type === "credit"
                                                ? "default"
                                                : "secondary"
                                        }
                                        className="text-xs"
                                    >
                                        {transaction.type}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Button
                            variant="outline"
                            className="w-full border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                            View All Transactions
                        </Button>
                    </div>
                </CardContent>
            </Card> */}
        </div>
    );
}
