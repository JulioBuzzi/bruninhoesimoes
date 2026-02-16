# 📸 Guia de Integração - Cloudinary

## 1️⃣ Criar Conta Cloudinary

1. Acesse [cloudinary.com](https://cloudinary.com)
2. Sign up com email
3. Confirme email
4. Dashboard: Você verá suas credenciais:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

## 2️⃣ Instalar SDK no Frontend

```bash
cd frontend
npm install next-cloudinary
```

## 3️⃣ Configurar Variável no Frontend

No `.env.local`:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu-cloud-name
```

## 4️⃣ Criar Componente de Upload

Criar arquivo: `src/components/CloudinaryUpload.tsx`

```typescript
'use client';

import { CldUploadWidget } from 'next-cloudinary';
import { useState } from 'react';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  folder?: string;
}

export default function CloudinaryUpload({ 
  onUploadSuccess, 
  folder = 'flamengo-jogadores' 
}: CloudinaryUploadProps) {
  const [loading, setLoading] = useState(false);

  return (
    <CldUploadWidget
      uploadPreset="seu-upload-preset" // Crie no dashboard Cloudinary
      folder={folder}
      onSuccess={(result: any) => {
        onUploadSuccess(result.info.secure_url);
        setLoading(false);
      }}
      onQueuesEnd={() => setLoading(false)}
    >
      {({ open }) => (
        <button
          onClick={() => {
            setLoading(true);
            open();
          }}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Selecionar Foto'}
        </button>
      )}
    </CldUploadWidget>
  );
}
```

## 5️⃣ Criar Upload Preset (Unsigned)

No dashboard Cloudinary:

1. Vá para Settings → Upload
2. Scroll até "Upload presets"
3. Clique em "Add upload preset"
4. Configure:
   - **Name:** `flamengo-upload` (qualquer nome)
   - **Unsigned:** ON
   - **Allowed formats:** jpg, jpeg, png
   - **Folder:** `flamengo-jogadores`
   - **Transformation:**
     - Width: 500
     - Height: 500
     - Crop: fill
     - Quality: auto
5. Salve

## 6️⃣ Usar no Form de Jogador

Exemplo:

```typescript
'use client';

import { useState } from 'react';
import CloudinaryUpload from '@/components/CloudinaryUpload';
import { jogadoresService } from '@/services/api';

export default function NovoJogador() {
  const [fotoUrl, setFotoUrl] = useState('');
  const [nome, setNome] = useState('');
  const [numero, setNumero] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const novoJogador = {
      numero_camisa: Number(numero),
      nome,
      posicao: 'Atacante', // Você define
      foto_url: fotoUrl,
      data_nascimento: '1990-01-01'
    };

    try {
      await jogadoresService.save(novoJogador);
      alert('Jogador adicionado!');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
      />
      <input
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        placeholder="Número"
        type="number"
      />
      
      <CloudinaryUpload onUploadSuccess={setFotoUrl} />
      
      {fotoUrl && <img src={fotoUrl} alt="Preview" width={100} />}
      
      <button type="submit" disabled={!fotoUrl || !nome || !numero}>
        Salvar Jogador
      </button>
    </form>
  );
}
```

## 7️⃣ Exibir Fotos (já está no CampeonatoPage)

```typescript
<img src={jogador.foto_url} alt={jogador.nome} />
```

## 🔒 Segurança

⚠️ **IMPORTANTE:**
- Nunca exponha seu **API Secret**
- Use **Unsigned uploads** para frontend
- Configure whitelist de domínios no Cloudinary

## 💾 Backup de Fotos

Para backup automático, configure no Cloudinary:
- Settings → Storage
- Backup to Google Drive/Dropbox

---

**Status:** Quando implementar, nos avalie a página! 📱
