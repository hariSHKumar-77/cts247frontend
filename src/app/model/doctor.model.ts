interface DoctorDetails {
    doctorId: any;
    doctorName: any;
    clinicAddress: any;
    experience: any;
    qualification: any;
    location: any;
    languages: any;
    imgUrl: any;
}

interface ServiceDetails {
    serviceId: any;
    serviceName: any;
    serviceDesc: any;
    serviceDesc2: any;
    imgUrl: any;
}

export class Doctor {
    doctorAvailabilityId: any;
    doctor!: DoctorDetails;
    service!: ServiceDetails;
    amount: any;
    timeSlots: any;
}
