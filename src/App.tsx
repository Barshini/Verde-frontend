import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { Layout } from "@/components/layout/Layout";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

import Landing from "@/pages/Landing";
import Collections from "@/pages/Collections";
import Product from "@/pages/Product";
import View360 from "@/pages/View360";
import Heritage from "@/pages/Heritage";
import Craftsmanship from "@/pages/Craftsmanship";
import LimitedEditions from "@/pages/LimitedEditions";
import Bespoke from "@/pages/Bespoke";
import Boutiques from "@/pages/Boutiques";
import Login from "@/pages/Login";
import Cart from "@/pages/Cart";
import Wishlist from "@/pages/Wishlist";
import Checkout from "@/pages/Checkout";
import OrderConfirmation from "@/pages/OrderConfirmation";
import Dashboard from "@/pages/Dashboard";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";
import Press from "@/pages/Press";
import About from "@/pages/About";
import Sustainability from "@/pages/Sustainability";
import OrderTracking from "@/pages/OrderTracking";
import CareGuide from "@/pages/CareGuide";
import PrivateViewing from "@/pages/PrivateViewing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfSale from "@/pages/TermsOfSale";
import ShippingReturns from "@/pages/ShippingReturns";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/collections" component={Collections} />
        <Route path="/product/:id" component={Product} />
        <Route path="/360-view" component={View360} />
        <Route path="/heritage" component={Heritage} />
        <Route path="/craftsmanship" component={Craftsmanship} />
        <Route path="/limited-editions" component={LimitedEditions} />
        <Route path="/bespoke" component={Bespoke} />
        <Route path="/boutiques" component={Boutiques} />
        <Route path="/login">{() => <Login />}</Route>
        <Route path="/register">{() => <Login initialTab="register" />}</Route>
        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/order-confirmation" component={OrderConfirmation} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/press" component={Press} />
        <Route path="/about" component={About} />
        <Route path="/sustainability" component={Sustainability} />
        <Route path="/order-tracking" component={OrderTracking} />
        <Route path="/care-guide" component={CareGuide} />
        <Route path="/private-viewing" component={PrivateViewing} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-of-sale" component={TermsOfSale} />
        <Route path="/shipping-returns" component={ShippingReturns} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
        <WouterRouter>
          <ErrorBoundary>
            <Router />
          </ErrorBoundary>
        </WouterRouter>
        <Toaster position="bottom-right" richColors />
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}

export default App;
