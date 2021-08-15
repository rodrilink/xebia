import React, { Suspense, lazy } from 'react';
import { withRouter, Switch, Route, Redirect, RouteProps } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { PageLoader } from './components/atoms';
import Base from './components/Base';

/* Used to render a lazy component with react-router */
const waitFor = (Tag: React.LazyExoticComponent<any>) => (props: any) => <Tag {...props} />;

const Main = lazy(() => import('./components/molecules/Main'));

const Routes = ({ location }: RouteProps) => {
    const currentKey = location!.pathname.split('/')[1] || '/';
    const timeout = { enter: 500, exit: 500 };

    // Animations supported
    //      'rag-fadeIn'
    //      'rag-fadeInRight'
    //      'rag-fadeInLeft'

    const animationName = 'rag-fadeIn';

    return (
        <Base>
            <TransitionGroup>
                <CSSTransition key={currentKey} timeout={timeout} classNames={animationName} exit={false}>
                    <Suspense fallback={<PageLoader />}>
                        <Switch location={location}>
                            <Route path="/" component={waitFor(Main)} />
                            <Redirect to="/" />
                        </Switch>
                    </Suspense>
                </CSSTransition>
            </TransitionGroup>
        </Base>
    )
}

export default withRouter(Routes);
