import { Publisher,Subjects, ExpirationCompletedEvent } from "@bilal009/common";

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent>{
    subject: Subjects.ExpirationCompleted = Subjects.ExpirationCompleted
}

