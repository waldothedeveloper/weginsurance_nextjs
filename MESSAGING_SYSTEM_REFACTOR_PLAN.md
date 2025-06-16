# 📱 Messaging System Refactor Plan

## Server Components + Package Simplification

### 🎯 **Project Goals**

1. Replace existing messaging system with Server Components
2. Eliminate unnecessary dependencies
3. Modernize state management with TanStack Query
4. Simplify architecture while improving functionality

---

## 📦 **Package Cleanup Strategy**

### **Dependencies to Remove**

```json
{
  "packages_to_remove": [
    "@novu/node",
    "@novu/notification-center",
    "airtable",
    "jotai",
    "pusher",
    "pusher-js",
    "swr",
    "underscore",
    "@types/underscore",
    "@swc-jotai/react-refresh"
  ]
}
```

### **New Dependencies to Add**

```json
{
  "new_dependencies": [
    "@tanstack/react-query": "^5.17.0",
    "@tanstack/react-query-devtools": "^5.17.0"
  ]
}
```

### **Migration Path**

- **Jotai → React Query**: Replace atom-based state with server state management
- **SWR → TanStack Query**: Better caching, background updates, optimistic updates
- **Pusher → Server Actions**: Real-time updates via Next.js native functionality
- **Underscore → Native ES6**: Replace utility functions with modern JavaScript
- **Novu → Simple notifications**: Use browser notifications or toast libraries

---

## 🏗️ **New Architecture**

### **Core Philosophy**

- **Server-first**: Data fetching happens on the server
- **Minimal client state**: Only UI state lives on the client
- **Native React**: Leverage React 18+ features (Suspense, Server Components)
- **Standard patterns**: Follow Next.js 13+ best practices

### **Data Flow**

```
Phone Number → Server Component → Twilio API → Sorted Messages → Client UI
     ↓
Server Actions → Send Message → Revalidate → Updated UI
```

---

## 📂 **Implementation Structure**

### **1. Core Messaging System**

```typescript
// app/messages/page.tsx - Main Server Component
export default async function MessagesPage({ searchParams }) {
  const phoneNumber = searchParams.phone

  if (!phoneNumber) {
    return <PhoneSelector />
  }

  // Server-side data fetching
  const messages = await getAllMessagesForPhone(phoneNumber)

  return (
    <QueryProvider>
      <MessagesContainer
        initialMessages={messages}
        phoneNumber={phoneNumber}
      />
    </QueryProvider>
  )
}
```

### **2. TanStack Query Integration**

```typescript
// hooks/useMessages.ts
export function useMessages(phoneNumber: string, initialMessages: Message[]) {
  return useQuery({
    queryKey: ["messages", phoneNumber],
    queryFn: () =>
      fetch(`/api/messages/${phoneNumber}`).then((res) => res.json()),
    initialData: initialMessages,
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000, // Data is fresh for 10 seconds
  });
}

// hooks/useSendMessage.ts
export function useSendMessage(phoneNumber: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => sendMessage(phoneNumber, message),
    onSuccess: () => {
      // Invalidate and refetch messages
      queryClient.invalidateQueries(["messages", phoneNumber]);
    },
  });
}
```

### **3. Simplified State Management**

```typescript
// No more Jotai atoms, just React Query + URL state
// Selected user comes from URL parameters
// Message state managed by TanStack Query
// UI state uses useState where needed

// Before (with Jotai):
// const selectedUser = useAtomValue(selectedUserAtom)

// After (with URL state):
// const phoneNumber = searchParams.phone
```

### **4. Server Actions for Real-time Updates**

```typescript
// actions/messaging.ts
"use server";

export async function sendMessage(phoneNumber: string, message: string) {
  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  });

  revalidatePath(`/messages`);
  revalidateTag(`messages-${phoneNumber}`);
}

export async function refreshMessages(phoneNumber: string) {
  revalidateTag(`messages-${phoneNumber}`);
}
```

---

## 🔄 **Migration Steps**

### **Phase 1: Package Cleanup (Week 1)**

1. **Remove Jotai dependencies**
   - Delete `lib/state/atoms.ts`
   - Replace `useAtomValue` with URL params or React Query
2. **Remove SWR**
   - Replace `useSWR` hooks with `useQuery`
   - Update data fetching patterns
3. **Remove Pusher**
   - Replace real-time updates with polling or Server Actions
   - Delete pusher configuration files
4. **Remove Underscore**
   - Replace utility functions with native ES6 methods
   - Update `groupMessages`, `sortMessages`, etc.

### **Phase 2: Server Components (Week 2)**

1. **Create new App Router structure**

   ```
   app/
   ├── messages/
   │   ├── page.tsx
   │   ├── loading.tsx
   │   └── components/
   └── api/
       └── messages/
           └── [phone]/
               └── route.ts
   ```

2. **Implement Server Components**

   - Main messages page
   - Phone selector
   - Messages list display

3. **Add TanStack Query**
   - Set up QueryClient
   - Create message queries
   - Add mutation for sending messages

### **Phase 3: Feature Parity (Week 3)**

1. **Message Display**
   - Date sorting (newest first)
   - Message direction indicators
   - Media attachment support
2. **Real-time Updates**

   - Polling with TanStack Query
   - Optimistic updates for sent messages
   - Error handling and retry logic

3. **User Experience**
   - Loading states
   - Error boundaries
   - Responsive design

### **Phase 4: Cleanup & Optimization (Week 4)**

1. **Remove old Pages Router messaging**

   - Delete `pages/admin/[[...dashboard]].js` messaging logic
   - Clean up unused components
   - Update navigation links

2. **Performance Optimization**
   - Bundle size analysis
   - Remove unused code
   - Optimize imports

---

## 📊 **Expected Improvements**

### **Bundle Size Reduction**

- **Jotai**: ~15KB saved
- **SWR**: ~8KB saved
- **Pusher**: ~25KB saved
- **Underscore**: ~20KB saved
- **Novu**: ~30KB saved
- **Total**: ~98KB reduction (~35% smaller bundle)

### **Performance Gains**

- **Server Components**: 60-80% faster initial load
- **TanStack Query**: Better caching, fewer API calls
- **Simplified state**: Reduced re-renders and memory usage
- **Native React**: Better tree-shaking and optimization

### **Developer Experience**

- **Fewer dependencies**: Simpler maintenance
- **Standard patterns**: Easier onboarding
- **Better TypeScript**: Improved type inference
- **Debugging**: TanStack Query DevTools

---

## 🔧 **Updated Package.json (Relevant Changes)**

### **Remove**

```json
{
  "dependencies": {
    "jotai": "REMOVE",
    "swr": "REMOVE",
    "pusher": "REMOVE",
    "pusher-js": "REMOVE",
    "@novu/node": "REMOVE",
    "@novu/notification-center": "REMOVE",
    "airtable": "REMOVE",
    "underscore": "REMOVE"
  },
  "devDependencies": {
    "@swc-jotai/react-refresh": "REMOVE",
    "@types/underscore": "REMOVE"
  }
}
```

### **Add**

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.17.0"
  },
  "devDependencies": {
    "@tanstack/react-query-devtools": "^5.17.0"
  }
}
```

---

## 🚀 **Key Benefits**

1. **Simpler Architecture**: Server Components + TanStack Query + Server Actions
2. **Better Performance**: Smaller bundle, faster loads, better caching
3. **Modern Patterns**: Following Next.js 13+ best practices
4. **Easier Maintenance**: Fewer dependencies, standard patterns
5. **Better DX**: TanStack Query DevTools, better TypeScript support
6. **Same Functionality**: All current features maintained or improved

---

## ✅ **Success Criteria**

- [ ] All messaging functionality works with Server Components
- [ ] Bundle size reduced by 30%+
- [ ] Initial page load 60%+ faster
- [ ] All identified packages successfully removed
- [ ] TanStack Query properly integrated
- [ ] Real-time updates working via Server Actions
- [ ] Full type safety maintained
- [ ] No regression in user experience

---

This plan transforms your messaging system into a modern, simplified, and performant solution while dramatically reducing complexity and bundle size.
