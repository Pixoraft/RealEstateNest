import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { calculateEMI } from "@/lib/utils";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emiData, setEmiData] = useState(calculateEMI(5000000, 8.5, 20));

  const handleCalculate = () => {
    const newEmiData = calculateEMI(loanAmount, interestRate, loanTenure);
    setEmiData(newEmiData);
  };

  return (
    <section id="emi-calculator" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your home loan EMI instantly</p>
          </div>
          
          <Card className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block">Loan Amount (₹)</Label>
                  <Input 
                    type="number" 
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent bg-white text-gray-900" 
                    placeholder="50,00,000"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block">Interest Rate (%)</Label>
                  <Input 
                    type="number" 
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent bg-white text-gray-900" 
                    placeholder="8.5" 
                    step="0.1"
                  />
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-900 mb-2 block">Loan Tenure (Years)</Label>
                  <Input 
                    type="number" 
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-saffron focus:border-transparent bg-white text-gray-900" 
                    placeholder="20"
                  />
                </div>
                
                <Button 
                  onClick={handleCalculate}
                  className="w-full bg-saffron text-white py-3 rounded-lg hover:bg-saffron-dark transition-colors font-medium"
                >
                  Calculate EMI
                </Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">EMI Breakdown</h3>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Monthly EMI</span>
                  <span className="text-xl font-bold text-deep-blue">
                    ₹{emiData.monthlyEMI.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="text-lg font-semibold text-trust-orange">
                    ₹{emiData.totalInterest.toLocaleString('en-IN')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ₹{emiData.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
