import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class RxjsComponent implements OnDestroy {
    subscriptions: Subscription[] = [];

    addSubscription(subscription: Subscription) {
        this.subscriptions.push(subscription);
    }

    ngOnDestroy(): void {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(subscription => {
                subscription.unsubscribe();
            }
            );
        }
    }
}
