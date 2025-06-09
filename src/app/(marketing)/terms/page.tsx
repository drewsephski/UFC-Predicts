import React from 'react';
import Background from '@/components/global/background';
import Wrapper from '@/components/global/wrapper';
import Container from '@/components/global/container';

const TermsPage = () => {
  return (
    <Background>
      <Wrapper className="py-20 lg:py-28">
        <Container className="text-center" simple>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-800 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            Content for the Terms of Service page is coming soon. Please check back later!
          </p>
        </Container>
      </Wrapper>
    </Background>
  );
};

export default TermsPage;
