/*
  # Criar tabela de perfis de usuários - SGG Sistema de Gerenciamento de Granja

  ## Descrição
  Esta migração cria a estrutura necessária para autenticação e gerenciamento de perfis de usuários.

  ## 1. Novas Tabelas
  
  ### `profiles`
  Tabela para armazenar informações adicionais dos usuários
  - `id` (uuid, primary key) - Referencia auth.users.id
  - `nome` (text, obrigatório) - Nome completo do usuário
  - `email` (text, obrigatório, único) - Email do usuário
  - `created_at` (timestamptz) - Data de criação do registro
  - `updated_at` (timestamptz) - Data de última atualização

  ## 2. Segurança (RLS)
  
  ### Tabela profiles
  - RLS habilitado para máxima segurança
  - **SELECT**: Usuários autenticados podem ler apenas seu próprio perfil
  - **INSERT**: Novos perfis são criados automaticamente via trigger após signup
  - **UPDATE**: Usuários autenticados podem atualizar apenas seu próprio perfil
  - **DELETE**: Nenhum usuário pode deletar perfis (protegido)

  ## 3. Triggers e Funções
  
  ### Função handle_new_user
  - Cria automaticamente um perfil quando um novo usuário se registra
  - Extrai nome e email dos metadados do usuário
  - Garante sincronização entre auth.users e profiles

  ## 4. Notas Importantes
  - A tabela profiles é sincronizada automaticamente com auth.users
  - Deletar um usuário de auth.users deleta automaticamente seu perfil (CASCADE)
  - Todos os dados de usuários estão protegidos por RLS
*/

-- Criar tabela de perfis
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política SELECT: usuários podem ler apenas seu próprio perfil
CREATE POLICY "Usuários podem visualizar próprio perfil"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Política UPDATE: usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Usuários podem atualizar próprio perfil"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Política INSERT: permite inserção inicial via trigger
CREATE POLICY "Permitir criação de perfil via signup"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Função para criar perfil automaticamente após signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, nome, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'nome', 'Usuário'),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Índice para melhorar performance de buscas por email
CREATE INDEX IF NOT EXISTS profiles_email_idx ON profiles(email);