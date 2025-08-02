import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext"; 
import { toast } from "sonner";

// Define the user roles for the UI tabs
type UserRole = "Customer" | "Employee" | "Admin";

// Maps the UI-friendly role names to the format expected by the Spring Boot backend.
const roleMapping: { [key in UserRole]: string } = {
    Customer: "ROLE_CUSTOMER",
    Employee: "ROLE_EMPLOYEE",
    Admin: "ROLE_ADMIN",
};

export default function LoginForm({
    className,
    ...props
}: React.ComponentProps<"div">) {
    const [role, setRole] = useState<UserRole>("Customer");
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    
    // State to hold validation errors for immediate feedback
    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const { login } = useAuth();
    const navigate = useNavigate();

    // Handles real-time validation for a given field
    const validateField = (name: 'email' | 'password', value: string) => {
        let errorMsg = "";
        switch (name) {
            case "email":
                if (!value) {
                    errorMsg = "Email is required.";
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    errorMsg = "Please enter a valid email address.";
                }
                break;
            case "password":
                if (!value) {
                    errorMsg = "Password is required.";
                } else if (value.length < 6) {
                    errorMsg = "Password must be at least 6 characters.";
                }
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
        return errorMsg === ""; // Return true if valid
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        // Clear error message when user starts typing
        if (errors[name as keyof typeof errors]) {
            validateField(name as 'email' | 'password', value);
        }
    };

    // Triggers validation when a user clicks or tabs away from an input
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: 'email' | 'password', value: string };
        validateField(name, value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate both fields before submitting to the backend
        const isEmailValid = validateField('email', credentials.email);
        const isPasswordValid = validateField('password', credentials.password);

        if (!isEmailValid || !isPasswordValid) {
            toast.error("Please fix the errors before submitting.");
            return; // Stop submission if client-side validation fails
        }

        // Include the selected role in the data sent to the backend
        const loginData = {
            username: credentials.email,
            password: credentials.password,
            role: roleMapping[role],
        };

        const result = await login(loginData);

        if (result.success) {
            toast.success("Signed in successfully!");
            if (result.role === "ROLE_ADMIN") {
                navigate("/admin/dashboard");
            } else if (result.role === "ROLE_EMPLOYEE") {
                navigate("/employee/dashboard");
            } else if (result.role === "ROLE_CUSTOMER") {
                navigate("/customer/dashboard");
            } else {
                navigate("/");
            }
        } else {
            // This handles backend errors like "Wrong credentials for role"
            toast.error(result.error || "Signin failed. Please try again.");
        }
    };

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-lg flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="bg-blue-600 text-white flex size-6 items-center justify-center rounded-md">
                        <Building2 className="size-4" />
                    </div>
                    BankABC
                </a>
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                            Welcome to BankABC
                        </CardTitle>
                        <CardDescription>
                            Select your role, then enter your email and
                            password to log in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs
                            value={role}
                            onValueChange={(value) => setRole(value as UserRole)}
                            className="w-full"
                        >
                           <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="Customer">Customer</TabsTrigger>
                                <TabsTrigger value="Employee">Employee</TabsTrigger>
                                <TabsTrigger value="Admin">Admin</TabsTrigger>
                            </TabsList>
                        </Tabs>

                        <form className="space-y-4 mt-6" onSubmit={handleSubmit} noValidate>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Username</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your.email@example.com"
                                    required
                                    value={credentials.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={credentials.password}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="self-center">
                        <Link to="/signup">
                            <div className="text-muted-foreground text-center text-xs text-balance">
                                Don't have an account?{" "}
                                <strong>Sign up</strong>
                            </div>
                        </Link>
                    </CardFooter>
                </Card>
                 <div className="text-muted-foreground text-center text-xs text-balance">
                    By logging in, you agree to BankABC's{" "}
                    <a
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                        href="#"
                        className="underline underline-offset-4 hover:text-primary"
                    >
                        Privacy Policy
                    </a>
                    .
                </div>
            </div>
        </div>
    );
}
