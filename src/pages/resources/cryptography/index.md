---
title: Cryptography
template: resources
---

CardSavr processes sensitive data including Payment Card Industry \(PCI\) Data Security Standard \(PCI-DSS\) Personally Identifiable Information \(PII\), Card Holder Data \(CHD\) and Secure Authentication Data \(SAD\); as well as Merchant Credentials \(MC\)for each site a card holder has a relationship with. It is incumbent upon CardSavr to provide integrity and confidentiality of data transiting throught it and persistently stored by it.  PCI-DSS certified best practice cryptography is utilized within CardSavr to provide the necessary security for this data.

## Data In-Flight

CardSavr inherently handles data in flight over the the public internet; both between applications using the CardSavr RESTful API and with merchant sites it places and updates payment cards on.

### TLS Protection

All network traffic between CardSavr and external systems including applications, merchant sites and operational support systems, utilize Transport Layer Security \(TLS\) \[RFC-8447\] to provide integrity and confidentiality of the data.  CardSavr requires a minimum TLS version 1.2, utilizing only safe cipher suites and prefers Perfect Forward Secrecy \(PFS\) cipher suites. When acting in the client role, only trusted Certificate Authority certificates are accepted from servers it communicates with.

### Additional REST API Protection

In addition to TLS protection, all CardSavr RESTful API requests and responses are signed, verified and encrypted.  Signing is done using the HMAC/SHA256 \[RFC 4868\] algorithm and encryption is done using the AES-CBC algorithm, both with 256bit keys.  Additionally, one time API session keys are automatically created after login using the ECHDE/P256 \[RFC-8422\] algorithm for perfect forward secrecy (PFS) protection of all data in transit with CardSavr.  This additional layer of security is to thwart any Man in The Middle \(MiTM\) attachks made upon it, The following diagram illustrates cryptographic protection of data flowing through CardSavr.

![CardSavr Protected Data Flow](/images/CardSavrDataFlow.jpg "CardSavr Protected Data Flow") 

#### Decryption

All responses from CardSavr are encrypted by the method described in encryption. To decrypt a response, follow the procedure below:

1. Convert the shared API session secret key from base64 into binary

2. Separate tuple string into encrypted body and initialization vector (IV) components (as separated by the '$' delimiter)

3. Convert the base64-encoded JSON body into binary

4. Convert the base64-encoded IV into binary

5. Create cipher from the AES-256-CBC algorithm, binary shared API session secret key (from step 1), and decoded IV (from step 4)

6. Decrypt decoded body (from step 3) using the cipher from step 5

##### SDK Decryption Support

The CardSavr API SDK takes care of this decryption process.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.

#### Encryption

CardSavr applications and CardSavr will encrypt request and response bodies, respectively, using their API session shared secret key. As a result, the encrypted payloads can only be decrypted by CardSavr or the user.

You must encrypt the body of your request using 256-bit, Advanced Encryption Standard cipher block chaining (i.e. AES-CBC-256), a 16-byte, cryptographically strong initilization vector, and your shared secret key.

Finally, when placed in your request, the encrypted request body must be combined with the base64-encoded initialization vector that was used to encrypt it. The two values must be separated by a '$' delimiter, illustrated below:

Base64-Encrypted-JSON-Body$Base64-IV

To send your request, put this value into your request body object in the property "encryptedBody".

##### SDK Encryption Support

The CardSavr API SDK takes care of this encryption process.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.

#### Signing

CardSavr requires signing for all requests and responses to ensure identity and integrity verification. Signing is implemented by three headers--nonce, signature, and authorization--that must be sent with each request and response. 

##### Authorization Header

The authorization header contains the integrator name and a prefix:

"Authorization": 'SWCH-HMAC-SHA256 Credentials=' + integrator name

##### Nonce Header

The nonce header contains the current UTC time in milliseconds, and therefore provides protection against replay attacks.

"Nonce": UTC in milliseconds

##### Signature Header

The string-to-sign format is: StringToSign = URL-Path (decoded) + Headers.Authorization + Headers.Nonce + Request Body, where URL-Path is the decoded relative endpoint you are calling.

To complete the signature, pass the string-to-sign to an HMAC SHA256 algorithm along with the secret API session key. Place this result value Base64 encoded in the signature header.

"Signature": Base64(HMAC-SHA256(Shared-Secret-Key, StringToSign))

##### SDK Signing Support

The CardSavr API SDK takes care of this signing process.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.

#### Verfication

To verify a response perform the same process as signing to dervie the signature, base64 encode the 256 hit result and compare it with the value in Headers.Signature. 

##### SDK Verfication Support

The CardSavr API SDK takes care of this verfication process.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.

## Data At Rest

CardSavr needs to persistently store confidential data including PII, CHD, SAD and MC.  At a minimum, this data must be persistently stored on a temporary basis in order to perform payment card updates on merchant sites.  Optionally, at the discretion of CardSavr applications, this data may be stored on a longer term basis.

### Database Protection

All data at rest is stored within a AWS Aurora Postgres data base. The entire data base is encrypted using AWS 256 bit cryptography in order to maintain integrity and confidentiality while at rest.

### Additional Credential Protection

In addition to the CardSavr data base being AES-256 encrypted, PCI-DSS SAD and MC are stored as encrypted blobs within the data base; known collectively as a per user Strivve Safe employing the AWS-256-CBC algorithm with keys derived by mixing an internal CardSavr environment key with a Cardholder key that is provided by the application. This dual key system employs a strategy of persistently storing the pair in seperate environments; CardSavr and partner in order to prevent disclosure with persistent material from within CardSavr.

For each card placement job, a unique ephemeral Job Safe is created containing  PCI-DSS SAD card information and MC for the merchant site.  This safe is stored as a blob encryted using the AES-256-CBC algorithm with a one time use key and exists only for the duration of a job.

## Cryptographic Keys

In order for cryptographic signing, verification, encryption and decryption to work, keys are needed to use with the various algorithms.  These algorithms are only as secure as thier key number randomnes; as such all keys generated by CardSavr use key stretching derivation algorithms in order to yield acceptable entropy.  All keys persistently stored within CardSavr are encrypted while at rest by key hierarchies protected by a secure root key. All keys other than those used in validating TLS certificates are symmetric 256 bit in length.

### CardSavr API Session Keys

All applications must identify and authenticate themselves with CardSavr.  This authentication is independent of the user of the application, who must also seperately authenticate themselves.  The application authentication serves two purposes; 1\) to allow only authorized applications to use CardSavr and 2\) to provide integrity  and confidentiality to all CardSavr API requests and responses by digitally signing and verifying them. CardSavr uses a shared API session secret key to encrypt and sign requests and responses.

#### Integrator Keys - API Session Initial Shared Secret Key

Every application has a unique name and a unique 256 bit key, known as an integrator key. All CardSavr API requests utilize a custom authentication header method which includes the application name, and include a signature header using the integrator key to generate a signature and to verify a returning signature for the user login phase of requests. This initial key must be used by the integrator application as the shared key for the /session/start and /session/login endpoints. Upon successful login, the /session/login endpoint will respond with the server's public elliptic curve point 256 key, which must then be used to compute the new API session shared secret key to be used for all other calls to CardSavr during a session.

If a partner is using the Partner Portal, their integrators' initial shared secret keys are automatically generated when created. Aside from the Partner Portal, integrators can be created using the POST /integrators endpoint.

##### Integrator Key Rotation

Integrator keys need to be rotated on a regular basis per PCI-DSS compliance.  Partners are responsible for rotating their own keys in accordance with their own PCI-compliant policies. Rotation must be done programmatically via the PUT /integrators endpoint or manually via the Partner Portal.

#### Ephemeral API Session Keys

CardSavr uses an Elliptic Curve Diffie-Hellman Ephemeral \(ECDHE\) key exchange to generate an ephemeral shared secret key known to only CardSavr and the client. This key is used to encrypt, decrypt, and sign all requests and responses to and from CardSavr post login. The diagram below shows how a Diffie-Hellman key exchange is used to generate a new ephemeral API session shared secret key (using paint as a metaphor).

![Eliptic Curve Diffie Hellman](/images/Diffie-Hellman_Key_Exchange.png "Key Exchange")

To obtain your \(ECDHE\) key, you must first generate your own public and private elliptic curve keys using the NIST standard point 256 \(P256\) curve. Most major languages have a library or built-in class that allows you to do this \(please see the built-in Node Class for an example\).

You must submit your own public key in your request to /session/login. /session/login will then respond with Cardsavr's public key in the payload. Use CardAavr's public key, along with your own private and public keys, to compute the shared secret key. Since CardSavr will execute the same process on the server, both parties will generate the same secret key, known only to them. This shared secret key MUST be used to encrypt and sign your requests post login. Please see encryption for details on encrypting your requests.

The CardSavr API SDK takes care of this generation process.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.

### Cardholder Safe Keys

The per card holder Strivve Safe protecting the PCI-DSS SAD and MC data for card holder users utilizes a pair of 256 bit keys.  One key, known as the enviroment key is generated and managed internally by the CardSavr servjce. The other key, known as the Cardholder Safe Key is generated for each card holder user.  These two keys are mixed together usinng a key derivation function resulting in a 256 bit key used to encrypt and decrypt the Strivve Safe.

#### Persistent Cardholder Safe Keys

Cardholder Safe Keys used with perstent card holder users are generated and managed by the partner.  This type of safe key is sent as a header on the post /cardsavr_users endpoint with a role of cardholder in order to create a persistent card holder user. It is best practice to have a unique key for each card holder. You must send the persistent safe key via header for each request that involves safe-protected information \(specifically, certain requests to /cardsavr_users, /cardsavr_accounts, /carsavr_cards and /place_card_on_single_site. This is listed in the documentation for each endpoint\).

#### Ephemeral Cardholder Safe Keys

Cardholder safe keys used with ephemeral card holder users are generated and managed by Strivve.  Ephemeral card holder users are created by not having a safe header present on the post /cardsavr_users with a role of cardholder. These types of users exist only for the short duration it takes to complete card placement during a single CardSavr session. 

#### Cardholder Safe Key Storage

Partners are responsible for maintaining thier own PCI compliant secure storage of persistent cardholder safe keys which improves Strivve Safe security by not having them stored within the CardSavr service. 

Strivve is responsible for storing short lived ephemeral cardholder safe keys in a PCI complaint manner and accomplishes this by encrypting them using AES-256-CBC with a secure key encrypting key.

#### Cardholder Safe Key Rotation

Persistent card holder safe keys need to be rotated on a regular basis per PCI-DSS compliance.  This is a shared responsbility between Strivve and the partner, with rotation of the environment key being Strivve's responsbility and rotation of the cardholder safe key(s) being the partners responsibility.  It is also the responsibility of the partner to generate the initial cardholder key for each persistent card holder user. Strivve recommends cardholder safe keys be rotated every year due them not being directly subject to crypt analysis.

Ephemeral card holder safe keys are not subject to key rotation due to them eixisting only for the short duration of an ephemeral card holder user.

### Password Keys

The password scheme used in the CardSavr service to authenticate non card holder users is based upon the strategy employed by Kerberos 5 in which the password can be converted to a signing key based upon shared information the user and the server know but which is not shared during the authentication.  This type of scheme is known as a [zero-knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) means of proving one party knows a value, in this case the password.  The key derived from the user password is used by the CardSavr application to sign material that is also known to both the application and the CardSavr API server, and provide this signature with the username during login.  The material used is a unique salt value for the session that is generated by the API server and returned to the application for new sessions being instantiated via the /session/start CardSavr API REST request/response.  The open standard PBKDF2 algorithm is employed to generate the signing key using the the user name as the salt and the password to derive it from.  The CardSavr API server has this key stored from when the user was created or their password was changed.

Here is pseudo code of algorithm used to verify the authenticity of a user via a password:
SigningKey = pbkdf2(SHA256, UserPassword, UserName, 5000Rounds, 256Bits);
SignedSalt = base64(HMAC-SHA256(SigningKey, SaltFromServer);

These keys must be generated by partner applications.  The CardSavr API SDK takes care of this generation and signing process.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.

#### Password/Key Change

In order to maintain PCI-DSS compliance, all non card holder user passwords must be changed every 90 days. It is the responsibility of the partner to change the passwords and associated keys for all agent users using thier own mechanisms.  For all person users, the CardSavr system will require them to change thier password after 90 days.

#### SDK Password Key Support

The CardSavr API SDK provides automatic session salt signing process and password key generation methods.  Applications which direclty use the CardSavr REST API must perform these cryptographic operations per the CardSavr API reference documentation.
