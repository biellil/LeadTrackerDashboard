
import { Route, Switch } from 'wouter';
import Dashboard from '../pages/dashboard';
import NotFound from '../pages/not-found';

export const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
