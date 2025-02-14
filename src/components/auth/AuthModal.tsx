
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { ResetPassword } from "./ResetPassword"

export function AuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isResetPassword, setIsResetPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, signUp, user } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isSignUp) {
        await signUp(email, password)
        toast({
          title: "Account created",
          description: "Please check your email to verify your account",
        })
      } else {
        await signIn(email, password)
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in",
        })
      }
      setIsOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  if (user) {
    return null
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setIsSignUp(false)
    setIsResetPassword(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">Sign In</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isResetPassword
              ? "Reset Password"
              : isSignUp
              ? "Create an account"
              : "Sign in"}
          </DialogTitle>
          <DialogDescription>
            {isResetPassword
              ? "Enter your email to receive a password reset link"
              : isSignUp
              ? "Enter your email below to create your account"
              : "Enter your email below to sign in to your account"}
          </DialogDescription>
        </DialogHeader>
        {isResetPassword ? (
          <ResetPassword />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="link"
                className="w-full"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </Button>
              {!isSignUp && (
                <Button
                  type="button"
                  variant="link"
                  className="w-full"
                  onClick={() => setIsResetPassword(true)}
                >
                  Forgot password?
                </Button>
              )}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
