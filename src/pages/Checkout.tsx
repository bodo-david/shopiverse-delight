
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CreditCard, Truck, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { useCart } from '@/hooks/useCart';
import { useCurrency } from '@/hooks/useCurrency';
import { toast } from 'sonner';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, getVAT, getTotal, clearCart } = useCart();
  const { currency, formatProductPrice } = useCurrency();
  
  const [activeStep, setActiveStep] = useState('delivery');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Romania',
    deliveryMethod: 'postal',
    paymentMethod: 'cash',
    agreeTerms: false
  });
  
  // Handle form data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle radio input changes
  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Redirect if cart is empty
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);
  
  // Form validation
  const validateDeliveryForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode'];
    const emptyFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (emptyFields.length > 0) {
      toast.error('Please fill in all required fields');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    
    return true;
  };
  
  // Handle continue to payment
  const handleContinueToPayment = () => {
    if (validateDeliveryForm()) {
      setActiveStep('payment');
    }
  };
  
  // Handle continue to summary
  const handleContinueToSummary = () => {
    setActiveStep('summary');
  };
  
  // Handle place order
  const handlePlaceOrder = () => {
    if (!formData.agreeTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    
    // Process order
    toast.success('Your order has been placed successfully!');
    
    // Clear cart and redirect to confirmation page
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 2000);
  };

  return (
    <>
      <Navbar />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 animate-fade-in">Checkout</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 animate-fade-in">
            <Tabs value={activeStep} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="delivery" 
                  disabled={activeStep !== 'delivery'} 
                  onClick={() => setActiveStep('delivery')}
                >
                  1. Delivery
                </TabsTrigger>
                <TabsTrigger 
                  value="payment" 
                  disabled={activeStep === 'delivery'} 
                  onClick={() => activeStep === 'summary' && setActiveStep('payment')}
                >
                  2. Payment
                </TabsTrigger>
                <TabsTrigger 
                  value="summary" 
                  disabled={activeStep !== 'summary'} 
                  onClick={() => activeStep === 'summary' && setActiveStep('summary')}
                >
                  3. Summary
                </TabsTrigger>
              </TabsList>
              
              {/* Delivery Tab */}
              <TabsContent value="delivery" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                    <CardDescription>Enter your shipping details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input 
                          id="firstName" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input 
                          id="lastName" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email*</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone*</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          type="tel" 
                          value={formData.phone} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address*</Label>
                      <Input 
                        id="address" 
                        name="address" 
                        value={formData.address} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="city">City*</Label>
                        <Input 
                          id="city" 
                          name="city" 
                          value={formData.city} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="postalCode">Postal Code*</Label>
                        <Input 
                          id="postalCode" 
                          name="postalCode" 
                          value={formData.postalCode} 
                          onChange={handleChange} 
                          required 
                        />
                      </div>
                      <div className="space-y-2 md:col-span-1">
                        <Label htmlFor="country">Country*</Label>
                        <Input 
                          id="country" 
                          name="country" 
                          value={formData.country} 
                          onChange={handleChange} 
                          required 
                          disabled 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Delivery Method*</Label>
                      <RadioGroup 
                        defaultValue={formData.deliveryMethod}
                        onValueChange={(value) => handleRadioChange('deliveryMethod', value)}
                      >
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="postal" id="postal" />
                          <Label htmlFor="postal" className="flex-1 cursor-pointer">
                            <div className="font-medium">Postal Service</div>
                            <div className="text-sm text-gray-500">1-3 business days</div>
                          </Label>
                          <div className="text-sm font-medium">Free</div>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md">
                          <RadioGroupItem value="courier" id="courier" />
                          <Label htmlFor="courier" className="flex-1 cursor-pointer">
                            <div className="font-medium">Rapid Courier Service</div>
                            <div className="text-sm text-gray-500">Next business day</div>
                          </Label>
                          <div className="text-sm font-medium">{formatProductPrice(15)}</div>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleContinueToPayment}>
                      Continue to Payment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Payment Tab */}
              <TabsContent value="payment" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Choose your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RadioGroup 
                      defaultValue={formData.paymentMethod}
                      onValueChange={(value) => handleRadioChange('paymentMethod', value)}
                    >
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer">
                          <div className="font-medium">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">Pay when your order arrives</div>
                        </Label>
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex-1 cursor-pointer">
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-sm text-gray-500">Pay by bank order</div>
                        </Label>
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                    </RadioGroup>
                    
                    {formData.paymentMethod === 'bank' && (
                      <div className="bg-gray-50 p-4 rounded-md mt-4">
                        <h3 className="text-sm font-medium text-gray-900 mb-2">Bank Transfer Details</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Please use the following details to make your bank transfer. Your order will ship once payment is confirmed.
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Account Name:</span>
                            <span className="font-medium">ShopVerse SRL</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Bank:</span>
                            <span className="font-medium">Sample Bank</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">IBAN:</span>
                            <span className="font-medium">RO00 SAMPLE 0000 0000 0000 0000</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Reference:</span>
                            <span className="font-medium">Order #{Math.floor(Math.random() * 100000)}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveStep('delivery')}>
                      Back to Delivery
                    </Button>
                    <Button onClick={handleContinueToSummary}>
                      Continue to Summary
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Summary Tab */}
              <TabsContent value="summary" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>Review your order details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order items */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-900">Items</h3>
                      <ul className="divide-y divide-gray-200">
                        {items.map(item => (
                          <li key={item.productId} className="py-4 flex">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium text-gray-900">{item.product.name}</h4>
                                <p className="text-sm font-medium text-gray-900">
                                  {formatProductPrice(item.product.prices[currency as keyof typeof item.product.prices] * item.quantity)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    {/* Shipping address */}
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-900">Shipping Address</h3>
                      <address className="not-italic text-sm text-gray-600">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.postalCode}<br />
                        {formData.country}<br />
                        {formData.phone}
                      </address>
                    </div>
                    
                    <Separator />
                    
                    {/* Payment and delivery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900">Payment Method</h3>
                        <p className="text-sm text-gray-600">
                          {formData.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Bank Transfer'}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-900">Delivery Method</h3>
                        <p className="text-sm text-gray-600">
                          {formData.deliveryMethod === 'postal' ? 'Postal Service (1-3 days)' : 'Rapid Courier (Next day)'}
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    {/* Terms and conditions agreement */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <label htmlFor="agreeTerms" className="text-sm text-gray-600">
                        I agree to the <a href="/terms" className="text-black hover:underline" target="_blank" rel="noopener noreferrer">terms and conditions</a> and <a href="/privacy" className="text-black hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>
                      </label>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveStep('payment')}>
                      Back to Payment
                    </Button>
                    <Button onClick={handlePlaceOrder}>
                      Place Order
                      <Check className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order summary */}
          <div className="w-full lg:w-80 flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="sticky top-24 border border-gray-200 rounded-lg shadow-sm p-6 bg-white">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              
              <ul className="space-y-3 mb-6">
                {items.map(item => (
                  <li key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-4">{item.product.name} (x{item.quantity})</span>
                    <span className="font-medium text-gray-900">
                      {formatProductPrice(item.product.prices[currency as keyof typeof item.product.prices] * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              
              <Separator className="my-3" />
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatProductPrice(getSubtotal(currency))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT</span>
                  <span className="font-medium text-gray-900">{formatProductPrice(getVAT(currency))}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-gray-900">
                    {formData.deliveryMethod === 'courier' 
                      ? formatProductPrice(15)
                      : 'Free'}
                  </span>
                </div>
              </div>
              
              <Separator className="my-3" />
              
              <div className="flex justify-between">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-bold text-gray-900">
                  {formatProductPrice(getTotal(currency) + (formData.deliveryMethod === 'courier' ? 15 : 0))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}
