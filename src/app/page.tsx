'use client';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export default function DocsPage() {
    return (
        <html>
            <body>

                <main style={{ padding: 16 }}>
                    <SwaggerUI url="/docs.yaml" docExpansion="list" defaultModelsExpandDepth={1} />
                </main>
            </body>
        </html>
    );
}
