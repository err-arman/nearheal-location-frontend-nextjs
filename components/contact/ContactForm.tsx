"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";

interface FormState {
  isLoading: boolean;
  success: boolean;
  error: boolean;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<{ email: string; message: string }>({
    email: "",
    message: "",
  });

  const [state, setState] = useState<FormState>({
    isLoading: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous messages when user starts typing
    if (state.success || state.error) {
      setState((prev) => ({
        ...prev,
        success: false,
        error: false,
        message: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.email || !formData.message) {
      setState({
        isLoading: false,
        success: false,
        error: true,
        message: "Please fill in all required fields",
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setState({
        isLoading: false,
        success: false,
        error: true,
        message: "Please enter a valid email address",
      });
      return;
    }

    // Start loading
    setState({
      isLoading: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      const response = await axiosInstance.post("/send-email", formData);

      if (response.data?.success) {
        // Success
        setState({
          isLoading: false,
          success: true,
          error: false,
          message: response.data.message || "Email sent successfully!",
        });

        // Reset form
        setFormData({
          email: "",
          message: "",
        });
      } else {
        // Server returned success: false
        setState({
          isLoading: false,
          success: false,
          error: true,
          message:
            response.data?.message || "Failed to send email. Please try again.",
        });
      }
    } catch (error: any) {
      console.error("Error sending email:", error);

      // Handle different types of errors
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        // Server responded with error status
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "Network error. Please check your connection and try again.";
      }

      setState({
        isLoading: false,
        success: false,
        error: true,
        message: errorMessage,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email address"
          required
          disabled={state.isLoading}
          className="w-full"
        />
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Please describe your inquiry or message in detail..."
          required
          disabled={state.isLoading}
          className="w-full min-h-[120px] resize-none"
        />
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={state.isLoading || !formData.email || !formData.message}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
      >
        {state.isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending Message...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      {/* Success Message */}
      {state.success && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {state.error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {state.message}
          </AlertDescription>
        </Alert>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-muted-foreground">
        By submitting this form, you agree to our privacy policy. We'll only use
        your information to respond to your inquiry.
      </p>
    </div>
  );
}
