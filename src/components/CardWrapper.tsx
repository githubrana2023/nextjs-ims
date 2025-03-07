import { ReactNode } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardFooter, CardTitle } from "@/components/ui/card"

type CardWrapperProps = {
    children: ReactNode;
    title: string;
    description: string;
}

export const CardWrapper = ({ children, description, title }: CardWrapperProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}