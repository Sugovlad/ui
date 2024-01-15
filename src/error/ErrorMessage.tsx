import React, {useEffect, useState} from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface ErrorProps {
    error: ErrorDescription,
    clearError: () => void
}

export interface ErrorDescription{
    header: string,
    errorMessage: string
}

const ErrorMessage: React.FC<ErrorProps> = ({error, clearError}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            clearError();
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Alert show={true} variant="danger" >
                <Alert.Heading>{error.header}</Alert.Heading>
                <p>
                    {error.errorMessage}
                </p>
                <hr/>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => clearError()} variant="outline-success">
                        Got it
                    </Button>
                </div>
            </Alert>

            <Button onClick={() => clearError()}>Show Alert</Button>
        </>
    );
}

export default ErrorMessage;