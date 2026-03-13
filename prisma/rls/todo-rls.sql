-- Enable RLS
ALTER TABLE "todos"
ENABLE ROW LEVEL SECURITY;

-- Policy: user can read own todos
CREATE POLICY "Users can read own todos"
ON "todos"
FOR SELECT
USING (auth.uid() = "userId"::uuid);

-- Policy: user can create own todos
CREATE POLICY "Users can create todos"
ON "todos"
FOR INSERT
WITH CHECK (auth.uid() = "userId"::uuid);

-- Policy: user can update own todos
CREATE POLICY "Users can update own todos"
ON "todos"
FOR UPDATE
USING (auth.uid() = "userId"::uuid);

-- Policy: user can delete own todos
CREATE POLICY "Users can delete own todos"
ON "todos"
FOR DELETE
USING (auth.uid() = "userId"::uuid);

-- Admin override policy
CREATE POLICY "Admins can manage todos"
ON "todos"
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM "User"
    WHERE "User".id::uuid = auth.uid()
    AND "User".role = 'ADMIN'
  )
);