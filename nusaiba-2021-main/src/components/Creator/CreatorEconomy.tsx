import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Gift, 
  Crown, 
  ShoppingBag, 
  TrendingUp,
  Coins,
  CreditCard,
  Users,
  Star,
  Target,
  Wallet,
  Plus
} from 'lucide-react';

interface EarningsData {
  total: number;
  thisMonth: number;
  donations: number;
  subscriptions: number;
  marketplace: number;
  adRevenue: number;
}

export default function CreatorEconomy() {
  const [earnings] = useState<EarningsData>({
    total: 2450.75,
    thisMonth: 892.30,
    donations: 340.50,
    subscriptions: 420.00,
    marketplace: 89.80,
    adRevenue: 42.00,
  });

  const [nusaibaCoins, setNusaibaCoins] = useState(1250);
  const [subscriptionTiers, setSubscriptionTiers] = useState([
    {
      id: '1',
      name: 'Basic Supporter',
      price: 4.99,
      subscribers: 28,
      benefits: ['Early access to content', 'Exclusive posts', 'Supporter badge'],
      isActive: true,
    },
    {
      id: '2',
      name: 'Premium Fan',
      price: 9.99,
      subscribers: 15,
      benefits: ['All Basic benefits', 'Monthly live Q&A', 'Behind-the-scenes content'],
      isActive: true,
    },
    {
      id: '3',
      name: 'VIP Member',
      price: 19.99,
      subscribers: 8,
      benefits: ['All Premium benefits', '1-on-1 video call monthly', 'Custom shoutouts'],
      isActive: false,
    },
  ]);

  const [marketplaceItems] = useState([
    {
      id: '1',
      name: 'Nusaiba Official T-Shirt',
      price: 24.99,
      sales: 45,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
      status: 'active',
    },
    {
      id: '2',
      name: 'Creator Preset Pack',
      price: 12.99,
      sales: 127,
      image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=200&h=200&fit=crop',
      status: 'active',
    },
  ]);

  const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Coins className="h-8 w-8 mr-3 text-yellow-500" />
          Creator Economy
        </h1>
        <p className="text-gray-600 mt-2">Monetize your content and build your creator empire</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Earnings</p>
                <p className="text-2xl font-bold">{formatCurrency(earnings.total)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">This Month</p>
                <p className="text-2xl font-bold">{formatCurrency(earnings.thisMonth)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Nusaiba Coins</p>
                <p className="text-2xl font-bold">{nusaibaCoins.toLocaleString()}</p>
              </div>
              <Coins className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Total Subscribers</p>
                <p className="text-2xl font-bold">{subscriptionTiers.reduce((acc, tier) => acc + tier.subscribers, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="coins">Nusaiba Coins</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Gift className="h-4 w-4 text-pink-500" />
                    <span>Donations</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(earnings.donations)}</span>
                </div>
                <Progress value={(earnings.donations / earnings.total) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-4 w-4 text-purple-500" />
                    <span>Subscriptions</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(earnings.subscriptions)}</span>
                </div>
                <Progress value={(earnings.subscriptions / earnings.total) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag className="h-4 w-4 text-green-500" />
                    <span>Marketplace</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(earnings.marketplace)}</span>
                </div>
                <Progress value={(earnings.marketplace / earnings.total) * 100} className="h-2" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-500" />
                    <span>Ad Revenue</span>
                  </div>
                  <span className="font-semibold">{formatCurrency(earnings.adRevenue)}</span>
                </div>
                <Progress value={(earnings.adRevenue / earnings.total) * 100} className="h-2" />
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Set Up Payment Method
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Gift className="h-4 w-4 mr-2" />
                  Enable Donations
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add Marketplace Item
                </Button>
                
                <Button className="w-full justify-start" variant="outline">
                  <Wallet className="h-4 w-4 mr-2" />
                  Withdraw Earnings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Donations Tab */}
        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="h-5 w-5 mr-2 text-pink-500" />
                Donation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Donations</Label>
                  <p className="text-sm text-gray-600">Allow viewers to send you tips</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">Donation Goals</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600">$5</p>
                    <p className="text-sm text-gray-600">Coffee</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">$25</p>
                    <p className="text-sm text-gray-600">Pizza</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <p className="text-2xl font-bold text-purple-600">$100</p>
                    <p className="text-sm text-gray-600">Equipment</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Coins className="h-5 w-5 text-yellow-600 mr-2" />
                  <span className="font-medium text-yellow-900">Payment Methods</span>
                </div>
                <p className="text-sm text-yellow-700">Supports: Bkash, Nagad, Stripe, PayPal, and Nusaiba Coins</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Subscription Tiers</h3>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Tier
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {subscriptionTiers.map((tier) => (
                <Card key={tier.id} className={`${tier.isActive ? 'border-purple-200 bg-purple-50' : 'opacity-60'}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{tier.name}</CardTitle>
                      <Badge variant={tier.isActive ? 'default' : 'secondary'}>
                        {tier.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-purple-600">${tier.price}</span>
                      <span className="text-gray-500">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{tier.subscribers}</p>
                      <p className="text-sm text-gray-600">subscribers</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="font-medium">Benefits:</p>
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-lg font-bold text-green-600">
                        {formatCurrency(tier.price * tier.subscribers)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Marketplace</h3>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplaceItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <h4 className="font-semibold mb-2">{item.name}</h4>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-green-600">{formatCurrency(item.price)}</span>
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="text-center py-2 bg-gray-50 rounded">
                      <p className="text-sm text-gray-600">{item.sales} sold</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(item.price * item.sales)} earned
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* Nusaiba Coins Tab */}
        <TabsContent value="coins">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Nusaiba Coins</h3>
                    <p className="text-yellow-100">Your in-app currency balance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold">{nusaibaCoins.toLocaleString()}</p>
                    <p className="text-yellow-200">≈ {formatCurrency(nusaibaCoins * 0.01)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Earn Coins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span>Daily Login Bonus</span>
                    <Badge className="bg-blue-600">+50 coins</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span>Video Upload</span>
                    <Badge className="bg-green-600">+100 coins</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <span>Live Stream (per hour)</span>
                    <Badge className="bg-purple-600">+200 coins</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spend Coins</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                    <span>Virtual Gifts</span>
                    <span className="text-pink-600 font-semibold">10-1000</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <span>Profile Upgrades</span>
                    <span className="text-indigo-600 font-semibold">500</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <span>Boost Content</span>
                    <span className="text-orange-600 font-semibold">200</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Coins className="h-4 w-4 mr-2" />
              Buy More Coins
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}