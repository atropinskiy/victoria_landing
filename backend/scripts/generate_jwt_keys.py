"""Генерирует пару ключей ES256 (EC P-256) для подписи JWT.

Запуск: python scripts/generate_jwt_keys.py
Вывод — готовые строки JWT_PRIVATE_KEY/JWT_PUBLIC_KEY для .env файла.
"""

from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec

private_key = ec.generate_private_key(ec.SECP256R1())
public_key = private_key.public_key()

private_pem = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption(),
).decode()

public_pem = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo,
).decode()

print(f'JWT_PRIVATE_KEY="{private_pem.strip()}"')
print()
print(f'JWT_PUBLIC_KEY="{public_pem.strip()}"')
