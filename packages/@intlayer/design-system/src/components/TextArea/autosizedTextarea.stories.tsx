import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import { InputVariant } from '../Input';
import { AutoSizedTextArea } from '.';

/**
 * ## AutoSizedTextArea Component
 *
 * An intelligent textarea that automatically adjusts its height based on content,
 * providing a smooth and responsive user experience for variable-length text input.
 *
 * ### Key Features
 * - **Dynamic Height**: Automatically grows and shrinks with content
 * - **Row Limits**: Configurable maximum rows before scrolling
 * - **Performance Optimized**: Efficient height calculations
 * - **Smooth Animations**: Natural resizing behavior
 * - **Scroll Management**: Automatic overflow handling
 *
 * ### Technical Details
 * - Line height calculation: 24px with 12px padding
 * - Real-time height adjustment on content changes
 * - Minimum height maintenance for empty state
 * - Resize disabled when auto-sizing is active
 *
 * ### Use Cases
 * - Chat message composition
 * - Social media post creation
 * - Comment forms
 * - Note-taking interfaces
 * - Dynamic content editing
 *
 * ### Accessibility Features
 * - Maintains focus during height changes
 * - Preserves cursor position
 * - Smooth transitions respect motion preferences
 */
const meta: Meta<typeof AutoSizedTextArea> = {
  title: 'Components/AutoSizedTextArea',
  component: (props) => <AutoSizedTextArea {...props} />,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An auto-resizing textarea that grows and shrinks with content, perfect for chat interfaces and dynamic forms.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text shown when empty',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: 'Current value for controlled usage',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    defaultValue: {
      description: 'Initial content for uncontrolled usage',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    autoSize: {
      description: 'Enable automatic height adjustment',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    maxRows: {
      description: 'Maximum number of rows before scrolling',
      control: { type: 'number', min: 1, max: 40 },
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '999' },
      },
    },
    variant: {
      description: 'Visual variant for different contexts',
      control: { type: 'select' },
      options: Object.values(InputVariant),
      table: {
        type: { summary: 'InputVariant' },
        defaultValue: { summary: 'InputVariant.DEFAULT' },
      },
    },
    validationStyleEnabled: {
      description: 'Enable validation styling',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof AutoSizedTextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ## Basic Examples
 *
 * Fundamental auto-sizing behavior demonstrations.
 */

/**
 * ### Default Auto-Sizing
 *
 * Basic auto-sizing textarea that grows with content.
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
      <div className="w-full max-w-md space-y-4">
        <AutoSizedTextArea
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full"
        />

        <div className="text-gray-600 text-sm">
          Start typing to see the textarea grow automatically. It will shrink
          back when you delete content.
        </div>
      </div>
    );
  },
  args: {
    autoSize: true,
    maxRows: 10,
    placeholder: 'Start typing and watch me grow...',
    value: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      'Start typing and watch me grow...'
    );

    // Test auto-sizing by typing content
    await userEvent.type(
      textarea,
      'This is line one.\nThis is line two.\nThis is line three.'
    );

    await expect(textarea).toHaveValue(
      'This is line one.\nThis is line two.\nThis is line three.'
    );
  },
};

/**
 * ### Row Limit Demonstration
 *
 * Auto-sizing with maximum row constraints and scrolling behavior.
 */
export const RowLimits: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-sm">3 Row Limit</label>
          <AutoSizedTextArea
            placeholder="I'll grow up to 3 lines..."
            autoSize={true}
            maxRows={3}
            defaultValue="Line 1\nLine 2\nLine 3\nLine 4 (this will cause scrolling)"
            className="w-full"
          />
          <div className="mt-1 text-gray-500 text-xs">
            Scrolls after 3 lines
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm">8 Row Limit</label>
          <AutoSizedTextArea
            placeholder="I can grow up to 8 lines..."
            autoSize={true}
            maxRows={8}
            defaultValue="This textarea has more room to grow.\n\nYou can add several lines before it starts scrolling.\n\nTry adding more content to see the scrolling behavior."
            className="w-full"
          />
          <div className="mt-1 text-gray-500 text-xs">
            More generous height allowance
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
        <div className="mb-2 font-medium text-sm text-yellow-800">
          💡 Row Limit Tips
        </div>
        <ul className="space-y-1 text-sm text-yellow-700">
          <li>
            • Use lower limits (2-4 rows) for compact interfaces like chat
          </li>
          <li>• Use higher limits (8-15 rows) for content creation</li>
          <li>• Consider user's screen size when setting limits</li>
          <li>• Unlimited growth (maxRows={999}) works well for note-taking</li>
        </ul>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Test that textareas are rendered with different row limits
    const shortTextarea = canvas.getByPlaceholderText(
      "I'll grow up to 3 lines..."
    );
    const longTextarea = canvas.getByPlaceholderText(
      'I can grow up to 8 lines...'
    );

    await expect(shortTextarea).toBeInTheDocument();
    await expect(longTextarea).toBeInTheDocument();
  },
};

/**
 * ## Interactive Examples
 *
 * Real-world usage scenarios with dynamic behavior.
 */

/**
 * ### Chat Interface
 *
 * A realistic chat message input with auto-sizing and send functionality.
 */
export const ChatInterface: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
      { id: 1, text: 'Hey there! 👋', sender: 'friend', time: '2:30 PM' },
      {
        id: 2,
        text: "How's your day going?",
        sender: 'friend',
        time: '2:31 PM',
      },
      {
        id: 3,
        text: 'Pretty good! Just working on some design system components.',
        sender: 'you',
        time: '2:32 PM',
      },
    ]);

    const sendMessage = () => {
      if (message.trim()) {
        const newMessage = {
          id: Date.now(),
          text: message.trim(),
          sender: 'you' as const,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages([...messages, newMessage]);
        setMessage('');
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };

    return (
      <div className="mx-auto w-full max-w-md overflow-hidden rounded-lg border border-gray-300 bg-white">
        {/* Chat Header */}
        <div className="bg-blue-600 p-4 text-white">
          <h3 className="font-semibold">Chat with Alex</h3>
          <div className="text-sm opacity-90">Online</div>
        </div>

        {/* Messages */}
        <div className="h-80 space-y-3 overflow-y-auto bg-gray-50 p-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-2xl px-4 py-2 ${
                  msg.sender === 'you'
                    ? 'rounded-br-md bg-blue-600 text-white'
                    : 'rounded-bl-md border border-gray-200 bg-white text-gray-800'
                }`}
              >
                <div>{msg.text}</div>
                <div
                  className={`mt-1 text-xs ${
                    msg.sender === 'you' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-gray-200 border-t bg-white p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <AutoSizedTextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                autoSize={true}
                maxRows={4}
                className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm"
                variant={InputVariant.INVISIBLE}
              />
            </div>

            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                message.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'cursor-not-allowed bg-gray-200 text-gray-400'
              }`}
            >
              Send
            </button>
          </div>

          <div className="mt-1 text-gray-500 text-xs">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText('Type a message...');

    // Test typing a multi-line message
    await userEvent.type(
      textarea,
      'This is a test message\nwith multiple lines\nto test auto-sizing'
    );

    // Test send button becomes enabled
    const sendButton = canvas.getByText('Send');
    await expect(sendButton).not.toBeDisabled();

    // Test sending message
    await userEvent.click(sendButton);
    await expect(textarea).toHaveValue('');
  },
};

/**
 * ### Note Taking Interface
 *
 * A note editor with generous height limits and auto-save functionality.
 */
export const NoteTaking: Story = {
  render: () => {
    const [note, setNote] = useState(
      '# My Notes\n\nStart writing your thoughts here...\n\n## Ideas\n- Auto-sizing textareas are great for content creation\n- They adapt to user needs dynamically\n- Perfect for note-taking applications'
    );
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const [saveStatus, setSaveStatus] = useState<
      'saved' | 'saving' | 'unsaved'
    >('saved');

    const saveNote = () => {
      setSaveStatus('saving');

      // Simulate save operation
      setTimeout(() => {
        setLastSaved(new Date());
        setSaveStatus('saved');
      }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNote(e.target.value);
      setSaveStatus('unsaved');
    };

    const wordCount = note
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const charCount = note.length;

    return (
      <div className="w-full max-w-4xl space-y-4">
        {/* Toolbar */}
        <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold text-gray-900">Note Editor</h3>
            <div className="text-gray-500 text-sm">
              {wordCount} words • {charCount} characters
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-gray-500 text-sm">
              {saveStatus === 'saved' && lastSaved && (
                <>Saved {lastSaved.toLocaleTimeString()}</>
              )}
              {saveStatus === 'saving' && 'Saving...'}
              {saveStatus === 'unsaved' && 'Unsaved changes'}
            </div>

            <button
              onClick={saveNote}
              disabled={saveStatus === 'saved' || saveStatus === 'saving'}
              className={`rounded-md px-4 py-2 font-medium transition-colors ${
                saveStatus === 'saved' || saveStatus === 'saving'
                  ? 'cursor-not-allowed bg-gray-200 text-gray-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saveStatus === 'saving' ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        {/* Editor */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <AutoSizedTextArea
            value={note}
            onChange={handleChange}
            placeholder="Start writing your notes..."
            autoSize={true}
            maxRows={25}
            className="min-h-[300px] w-full resize-none border-0 font-mono text-sm leading-relaxed focus:outline-none focus:ring-0"
            variant={InputVariant.INVISIBLE}
          />
        </div>

        {/* Footer */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3">
            <div>
              <strong>Auto-sizing:</strong> Enabled
            </div>
            <div>
              <strong>Max rows:</strong> 25
            </div>
            <div>
              <strong>Font:</strong> Monospace
            </div>
          </div>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue(/# My Notes/);

    await expect(textarea).toBeInTheDocument();

    // Test word count updates
    await expect(canvas.getByText(/\d+ words/)).toBeInTheDocument();
  },
};

/**
 * ### Disabled Auto-sizing
 *
 * Example showing fixed height behavior when auto-sizing is disabled.
 */
export const DisabledAutoSizing: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block font-medium text-sm">
            Auto-sizing Enabled
          </label>
          <AutoSizedTextArea
            placeholder="I will grow with content..."
            autoSize={true}
            maxRows={5}
            className="w-full"
          />
          <div className="mt-1 text-gray-500 text-xs">
            Height adjusts automatically
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium text-sm">
            Auto-sizing Disabled
          </label>
          <AutoSizedTextArea
            placeholder="I have fixed height..."
            autoSize={false}
            rows={4}
            className="w-full"
          />
          <div className="mt-1 text-gray-500 text-xs">
            Fixed height, user can resize manually
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <div className="mb-2 font-medium text-blue-900 text-sm">
          When to Disable Auto-sizing
        </div>
        <ul className="space-y-1 text-blue-800 text-sm">
          <li>• When you need consistent layout heights</li>
          <li>• For forms with strict spacing requirements</li>
          <li>• When users need manual resize control</li>
          <li>• In data entry applications with fixed formats</li>
        </ul>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const autoTextarea = canvas.getByPlaceholderText(
      'I will grow with content...'
    );
    const fixedTextarea = canvas.getByPlaceholderText('I have fixed height...');

    await expect(autoTextarea).toBeInTheDocument();
    await expect(fixedTextarea).toBeInTheDocument();
  },
};
