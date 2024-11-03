import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
const LoginDirect = () => {
  return (
    <Alert className="w-[48%] center border-1 border-black flex flex-col items-center">
      <AlertTitle className="flex items-center gap-2 text-black">
        You Don't Have an Access
      </AlertTitle>
      <AlertDescription>Please login first.</AlertDescription>
    </Alert>
  );
};

export default LoginDirect;
