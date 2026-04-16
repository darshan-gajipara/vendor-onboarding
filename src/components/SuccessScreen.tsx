import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetForm } from "@/features/vendor/vendorSlice";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  CheckCircle2,
  Building2,
  MapPin,
  Briefcase,
  FileText,
  RotateCcw,
  Mail,
  Phone,
  Users,
  Landmark,
} from "lucide-react";

const SuccessScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { step1, step2, step3 } = useAppSelector((s) => s.vendor);

  useEffect(() => {
    const payload = {
      step1,
      step2,
      step3,
      submittedAt: new Date().toISOString(),
    };

    console.log("Submitted Payload:", payload);
  }, [step1, step2, step3]);

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-green-800">
                Vendor Application Submitted
              </h1>
              <p className="mt-1 text-sm text-green-700">
                We’ve received your onboarding request. Our team will review it
                within 3–5 business days.
              </p>
            </div>

            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Submission Successful
            </Badge>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-4 w-4" />
                Company Information
              </CardTitle>
              <CardDescription>Basic business details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <InfoRow label="Company Name" value={step1.companyName} />
              <InfoRow label="Company Type" value={step1.companyType} />
              <InfoRow
                label="Registration No."
                value={step1.registrationNumber}
              />
              <InfoRow
                label="Established"
                value={step1.establishedDate}
              />

              <InfoRow
                label="Employees"
                value={String(step1.employeeCount ?? "—")}
                icon={<Users className="h-4 w-4" />}
              />

              <Separator />

              <InfoRow
                label="Contact Person"
                value={step1.contactName}
              />

              <InfoRow
                label="Email"
                value={step1.contactEmail}
                icon={<Mail className="h-4 w-4" />}
              />

              <InfoRow
                label="Phone"
                value={step1.contactPhone}
                icon={<Phone className="h-4 w-4" />}
              />

              {step1.companyLogo && (
                <FileCard
                  title="Company Logo"
                  file={step1.companyLogo}
                />
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Address & Banking
              </CardTitle>
              <CardDescription>Location and payment details</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <InfoRow label="Address" value={step2.address} />
              <InfoRow label="Country" value={step2.country} />
              <InfoRow label="State" value={step2.state} />
              <InfoRow label="ZIP Code" value={step2.zipCode} />

              <Separator />

              <InfoRow
                label="Bank Name"
                value={step2.bankName}
                icon={<Landmark className="h-4 w-4" />}
              />

              <InfoRow label="Account No." value={step2.accountNumber} />
              <InfoRow label="IFSC" value={step2.ifsc} />

              {step2.bankProof && (
                <FileCard
                  title="Bank Proof"
                  file={step2.bankProof}
                />
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Briefcase className="h-4 w-4" />
                Services & Terms
              </CardTitle>
              <CardDescription>Business offerings</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Services
                </p>

                <div className="flex flex-wrap gap-2">
                  {step3.services?.map((service, i) => (
                    <Badge key={i} variant="outline">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <InfoRow
                label="Pricing Model"
                value={step3.pricingModel}
              />

              <InfoRow
                label="Currency"
                value={step3.currency}
              />

              <InfoRow
                label="Declaration"
                value={step3.declaration ? "Accepted" : "Not Accepted"}
              />

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Notes
                </p>
                <div className="rounded-md border bg-muted/40 p-3 text-sm">
                  {step3.notes || "—"}
                </div>
              </div>

              {step3.finalDoc && (
                <FileCard
                  title="Final Document"
                  file={step3.finalDoc}
                />
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Need to submit another vendor?</p>
              <p className="text-sm text-muted-foreground">
                Start a fresh onboarding request.
              </p>
            </div>

            <Button onClick={() => dispatch(resetForm())}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Start New Application
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuccessScreen;


const InfoRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value?: string;
  icon?: React.ReactNode;
}) => (
  <div className="space-y-1">
    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </p>

    <div className="flex items-center gap-2 text-sm font-medium">
      {icon}
      <span>{value || "—"}</span>
    </div>
  </div>
);

const FileCard = ({
  title,
  file,
}: {
  title: string;
  file: {
    name: string;
    size: number;
    type: string;
  };
}) => (
  <div className="rounded-lg border bg-muted/30 p-3">
    <div className="mb-2 flex items-center gap-2">
      <FileText className="h-4 w-4 text-muted-foreground" />
      <p className="text-sm font-medium">{title}</p>
    </div>

    <p className="truncate text-sm">{file.name}</p>
    <p className="text-xs text-muted-foreground">
      {(file.size / 1024).toFixed(1)} KB • {file.type}
    </p>
  </div>
);