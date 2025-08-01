import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollText, Users, CreditCard, Shield, AlertTriangle, Mail, Phone, MapPin } from "lucide-react"

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 mt-10">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">Terms & Conditions</h1>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Badge variant="outline" className="text-primary border-primary/30">
              Customer Terms
            </Badge>
            <Badge variant="outline" className="text-secondary border-secondary/30">
              Maturedge Pty Ltd
            </Badge>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            This document outlines Nearheal's Practice Customer Terms and Conditions that apply to all services
            delivered by Nearheal.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Introduction */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-primary flex items-center gap-3">
                <ScrollText className="h-7 w-7" />
                Agreement Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This document outlines Nearheal's Practice Customer Terms and Conditions ("T&Cs") that will be
                applicable to all Services delivered and/or offered by Nearheal operated under Maturedge Pty Ltd (ACN:
                654 380 104) ("Nearheal"), the services may be delivered either via Nearheal.com.au ("Website") or
                otherwise.
              </p>
              <p>
                When anyone submits a Form and/or uses and/or accesses the Services in any other means, would be
                considered as deemed agreement with the T&Cs and the other conditions of the Agreement.
              </p>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <p className="text-sm font-medium text-primary mb-2">Important Note:</p>
                <p className="text-sm">
                  You acknowledge and certify that you carry full legal capacity and/or power to bind and/or contract
                  your employer or any other entity of concern to these T&Cs if you are accessing or using the Services
                  on behalf of an organization.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Key Definitions */}
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-secondary">Key Definitions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                  <h4 className="font-semibold text-secondary mb-2">Account</h4>
                  <p className="text-sm text-muted-foreground">
                    A Nearheal online account that permits a Practice Customer to manage its profile and access digital
                    services.
                  </p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <h4 className="font-semibold text-accent mb-2">Practice</h4>
                  <p className="text-sm text-muted-foreground">
                    A medical practice, center, clinic, or office where one or more Practitioners provide healthcare
                    services.
                  </p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                  <h4 className="font-semibold text-primary mb-2">Services</h4>
                  <p className="text-sm text-muted-foreground">
                    The services provided by Nearheal to the Practice Customer as outlined in the Registration Form.
                  </p>
                </div>
                <div className="p-4 bg-muted/20 rounded-lg border border-muted/30">
                  <h4 className="font-semibold text-foreground mb-2">Network</h4>
                  <p className="text-sm text-muted-foreground">
                    The website, iOS and Android mobile applications, and any future updates or replacements.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nearheal Responsibilities */}
          <Card className="border-accent/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-accent flex items-center gap-3">
                <Shield className="h-7 w-7" />
                Nearheal's Key Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Nearheal must be able to:</p>
              <ul className="space-y-2 ml-4">
                <li>• Provide Services following the terms of this Agreement</li>
                <li>• Offer Services in a timely and professional manner</li>
                <li>
                  • Comply with the Nearheal Privacy Policy to collect, store, and disclose all personal information
                  obtained from the Practice Customer
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Practice Customer Responsibilities */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-primary flex items-center gap-3">
                <Users className="h-7 w-7" />
                Practice Customer Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">Regulatory Compliance</h4>
                <p className="text-sm">
                  Service providers must maintain up-to-date regulatory approval and necessary licenses, certifications,
                  permissions, or qualifications to legally promote their services and engage with potential customers.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-foreground">Key Requirements:</h4>
                <ul className="space-y-2 ml-4 text-sm">
                  <li>• Pay fees to utilize Services strictly for promoting Practice and managing appointments</li>
                  <li>• Hold and maintain all licenses with appropriate regulatory boards</li>
                  <li>• Retain applicable credentials, certifications, and permits throughout the Term</li>
                  <li>• Ensure Content is correct, up to date, and accurate</li>
                  <li>• Notify Nearheal of any changes to qualifications or violations</li>
                  <li>• Respond quickly to bookings and enquiries from Visitors</li>
                  <li>• Maintain confidentiality and security of Visitor information</li>
                  <li>• Comply with all relevant privacy and information regulations</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-secondary flex items-center gap-3">
                <CreditCard className="h-7 w-7" />
                Payment Terms & Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/10">
                  <h4 className="font-semibold text-secondary mb-2">Subscription Fees</h4>
                  <p className="text-sm text-muted-foreground">
                    Service fees for initial setup, profile customization, and premium listings offered on various
                    billing cycles.
                  </p>
                </div>
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/10">
                  <h4 className="font-semibold text-accent mb-2">Transaction Fees</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment charged based on transaction type/volume, including payment processing and value-added
                    services.
                  </p>
                </div>
              </div>

              <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                <h4 className="font-semibold text-secondary mb-2">Payment Processing</h4>
                <p className="text-sm text-muted-foreground">
                  Stripe Payments Australia Pty Ltd supports payment processing services. Practice Customers must agree
                  to be bound by the Stripe Services Agreement. All disputes, refunds, and chargebacks are the sole
                  financial responsibility of the Practice Customer.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="border-accent/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-accent">Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Nearheal retains and maintains all intellectual property rights in the Services, as well as all Nearheal
                know-how, software, materials, data driven applications, and methodologies used in providing the
                Services.
              </p>

              <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                <h4 className="font-semibold text-accent mb-2">Usage Restrictions</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Services must only be used for purposes outlined in this Agreement</li>
                  <li>• No replication, modification, or reverse-engineering of Services</li>
                  <li>• No unauthorized use of Nearheal logos or trademarks</li>
                  <li>• No reselling of Services to third parties</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-primary flex items-center gap-3">
                <AlertTriangle className="h-7 w-7" />
                Termination & Renewal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Agreement starts when the registration Form is completed and Practice Customer agrees to the terms.
                Either party may terminate this Agreement by giving at least 30 days notice, with specific exceptions
                for Featured Listings (minimum 3 months) and Search Marketing campaigns (minimum 6 months).
              </p>

              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">Immediate Termination Grounds</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Willful breach of Agreement</li>
                  <li>• Bankruptcy or insolvency</li>
                  <li>• Loss of regulatory permits or licenses</li>
                  <li>• Behavior detrimental to Nearheal's reputation</li>
                  <li>• Abusive behavior toward Nearheal team members</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Liability & Warranties */}
          <Card className="border-secondary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-secondary">Liability & Warranties</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-secondary/5 p-4 rounded-lg border border-secondary/10">
                <h4 className="font-semibold text-secondary mb-2">Important Disclaimer</h4>
                <p className="text-sm">
                  Nearheal is not and should not be considered as a healthcare provider. The Practice Customer is solely
                  and exclusively accountable for the care of its patients and visitors.
                </p>
              </div>

              <p>
                To the highest extent permitted by law, Nearheal disclaims all implied rights, guarantees, remedies,
                conditions, and warranties. Nearheal limits its total responsibility for all Claims to the Fees paid
                under this Agreement during each consecutive 12-month period.
              </p>
            </CardContent>
          </Card>

          {/* Medical Advice Disclaimer */}
          <Card className="border-accent/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-accent flex items-center gap-3">
                <AlertTriangle className="h-7 w-7" />
                Not Medical Advice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                <p className="text-sm text-muted-foreground">
                  The information accessed via Nearheal website is general in nature and does not intend to offer
                  medical advice. If you have a health concern, it is important to consult with a respective health
                  professional. Consideration of any information within the Nearheal website should ALWAYS be consulted
                  with a qualified health service professional.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="border-primary/20 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl sm:text-3xl text-primary">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:support@nearheal.com.au"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      support@nearheal.com.au
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+61451645094"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +61 451 645 094
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      Maturedge Pty Ltd
                      <br />
                      3/8 Mackie St
                      <br />
                      Coniston, NSW 2500
                      <br />
                      Australia
                    </p>
                  </div>
                </div>
              </div>
              <Separator className="my-6" />
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  This Agreement will be governed by the laws of the State of Western Australia, and parties agree to
                  submit to the non-exclusive jurisdiction of the courts of that jurisdiction.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
