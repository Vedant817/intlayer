import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { InputVariant } from '../Input';
import { AutoCompleteTextarea } from '.';

const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function ReactQueryProvider({
  children,
  client = mockQueryClient,
}: {
  children: React.ReactNode;
  client?: QueryClient;
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

/**
 * ## AutoCompleteTextarea Component
 *
 * An AI-powered textarea that provides intelligent autocomplete suggestions as users type,
 * combining the auto-sizing functionality with contextual text completion capabilities.
 *
 * ### Key Features
 * - **AI-Powered Suggestions**: Context-aware autocomplete using configured AI models
 * - **Real-time Feedback**: Suggestions appear as you type with 200ms debounce
 * - **Visual Preview**: Inline suggestion display with ghost text
 * - **Keyboard Navigation**: Tab key to accept suggestions, Escape to dismiss
 * - **Context Analysis**: Uses surrounding text for better suggestions
 * - **Performance Optimized**: Efficient API calls and suggestion caching
 *
 * ### Technical Implementation
 * - Debounced API calls (200ms) to prevent excessive requests
 * - Context window of 5 lines before/after cursor for relevant suggestions
 * - Ghost layer positioning for accurate suggestion placement
 * - Cursor position tracking for suggestion acceptance
 *
 * ### Use Cases
 * - **Content Creation**: Blog posts, articles, documentation
 * - **Code Documentation**: Comments, README files, API docs
 * - **Email Composition**: Professional communication assistance
 * - **Creative Writing**: Story completion, narrative assistance
 * - **Social Media**: Post creation with engagement optimization
 * - **Technical Writing**: User guides, tutorials, specifications
 *
 * ### AI Integration
 * - Supports multiple AI providers (OpenAI, Anthropic, etc.)
 * - Configurable models and temperature settings
 * - Context-aware prompting for relevant suggestions
 * - Graceful error handling for API failures
 */
const meta: Meta<typeof AutoCompleteTextarea> = {
  title: 'Components/AutoCompleteTextarea',
  component: AutoCompleteTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An AI-powered textarea with intelligent autocomplete suggestions. Press Tab to accept suggestions when they appear.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      description: 'Placeholder text shown when textarea is empty',
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
    isActive: {
      description: 'Whether AI autocomplete functionality is enabled',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    suggestion: {
      description: 'Manual suggestion text (overrides AI suggestions)',
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
      description: 'Maximum rows before scrolling',
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
      },
    },
    className: {
      description: 'Additional CSS classes',
      control: 'text',
    },
  },
} satisfies Meta<typeof AutoCompleteTextarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * ## Basic Examples
 *
 * Fundamental autocomplete functionality demonstrations.
 */

/**
 * ### Default AI Autocomplete
 *
 * Basic AI-powered autocomplete that provides suggestions as you type.
 */
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value || '');

    return (
      <ReactQueryProvider>
        <div className="w-full max-w-2xl space-y-4">
          <AutoCompleteTextarea
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="min-h-[120px] w-full"
          />

          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 font-medium text-blue-900 text-sm">
              💡 How to Use
            </div>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• Start typing to see AI-powered suggestions appear</li>
              <li>
                • Press <kbd className="rounded border bg-white px-1">Tab</kbd>{' '}
                to accept suggestions
              </li>
              <li>• Suggestions appear after typing 3+ characters</li>
              <li>• Context from surrounding text improves suggestions</li>
            </ul>
          </div>
        </div>
      </ReactQueryProvider>
    );
  },
  args: {
    isActive: true,
    placeholder: 'Start typing to see AI suggestions...',
    value: '',
    autoSize: true,
    maxRows: 8,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByPlaceholderText(
      'Start typing to see AI suggestions...'
    );

    // Test basic functionality
    await userEvent.type(textarea, 'The weather today is');
    await expect(textarea).toHaveValue('The weather today is');
  },
};

/**
 * ### Manual Suggestion Mode
 *
 * Demonstrating manual suggestion override functionality.
 */
export const ManualSuggestions: Story = {
  render: () => {
    const [content, setContent] = useState('Hello, this is a test');
    const [manualSuggestion, setManualSuggestion] = useState(
      '  message for the autocomplete feature.'
    );

    const suggestionOptions = [
      ' message for the autocomplete feature.',
      ' document for our project.',
      ' email to send to the team.',
      ' note about the meeting.',
    ];

    return (
      <ReactQueryProvider>
        <div className="w-full max-w-3xl space-y-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium text-sm">
                Content with Manual Suggestion
              </label>
              <AutoCompleteTextarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                suggestion={manualSuggestion}
                isActive={false}
                autoSize={true}
                maxRows={6}
                className="w-full"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-sm">
                Suggestion Controls
              </label>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-gray-600 text-xs">
                    Current Suggestion
                  </label>
                  <input
                    type="text"
                    value={manualSuggestion}
                    onChange={(e) => setManualSuggestion(e.target.value)}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
                    placeholder="Enter suggestion text..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-gray-600 text-xs">
                    Quick Suggestions
                  </label>
                  <div className="space-y-1">
                    {suggestionOptions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => setManualSuggestion(suggestion)}
                        className="block w-full rounded bg-gray-100 px-2 py-1 text-left text-xs hover:bg-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setManualSuggestion('')}
                  className="w-full rounded bg-red-100 px-3 py-2 text-red-700 text-sm hover:bg-red-200"
                >
                  Clear Suggestion
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-2 font-medium text-gray-700 text-sm">
              Manual Suggestion Mode
            </div>
            <p className="text-gray-600 text-sm">
              When <code>isActive={false}</code> and <code>suggestion</code>{' '}
              prop is provided, the component displays manual suggestions
              instead of AI-generated ones. This is useful for testing, demos,
              or custom suggestion logic.
            </p>
          </div>
        </div>
      </ReactQueryProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue('Hello, this is a test');

    await expect(textarea).toBeInTheDocument();

    // Test suggestion buttons
    const suggestionButtons = canvas.getAllByText(
      'message for the autocomplete feature.'
    );
    await userEvent.click(suggestionButtons[1]);
  },
};

/**
 * ## Real-World Applications
 *
 * Practical examples showing autocomplete in various contexts.
 */

/**
 * ### Content Creation Assistant
 *
 * A blog post editor with AI writing assistance.
 */
export const ContentCreation: Story = {
  render: () => {
    const [blogPost, setBlogPost] = useState(
      '# The Future of Web Development\n\nWeb development has evolved significantly over the past decade'
    );
    const [isAiEnabled, setIsAiEnabled] = useState(true);
    const [aiModel, setAiModel] = useState('gpt-4');
    const [temperature, setTemperature] = useState(0.7);

    const wordCount = blogPost
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const estimatedReadTime = Math.ceil(wordCount / 200); // ~200 words per minute

    return (
      <ReactQueryProvider>
        <div className="w-full max-w-4xl space-y-6">
          {/* Editor Header */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-semibold text-lg">AI Blog Post Editor</h3>
                <div className="text-gray-600 text-sm">
                  {wordCount} words • ~{estimatedReadTime} min read
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isAiEnabled}
                    onChange={(e) => setIsAiEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">AI Assistant</span>
                </label>

                {isAiEnabled && (
                  <>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="rounded border border-gray-300 px-2 py-1 text-sm"
                    >
                      <option value="gpt-4">GPT-4</option>
                      <option value="gpt-3.5-turbo">GPT-3.5</option>
                      <option value="claude-3">Claude 3</option>
                    </select>

                    <label className="flex items-center gap-2 text-sm">
                      Creativity:
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={temperature}
                        onChange={(e) =>
                          setTemperature(parseFloat(e.target.value))
                        }
                        className="w-16"
                      />
                      <span className="w-8">{temperature}</span>
                    </label>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Editor */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-gray-200 border-b bg-gray-50 px-4 py-2">
              <div className="flex items-center gap-4 text-gray-600 text-sm">
                <span>
                  Status:{' '}
                  {isAiEnabled ? (
                    <span className="text-green-600">AI Enabled</span>
                  ) : (
                    <span className="text-gray-500">AI Disabled</span>
                  )}
                </span>
                <span>Model: {aiModel}</span>
                <span>Temperature: {temperature}</span>
              </div>
            </div>

            <div className="p-6">
              <AutoCompleteTextarea
                value={blogPost}
                onChange={(e) => setBlogPost(e.target.value)}
                isActive={isAiEnabled}
                placeholder="Start writing your blog post..."
                autoSize={true}
                maxRows={20}
                className="min-h-[400px] w-full resize-none border-0 font-serif text-base leading-relaxed focus:outline-none focus:ring-0"
                variant={InputVariant.INVISIBLE}
              />
            </div>
          </div>

          {/* Writing Tips */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 font-medium text-blue-900 text-sm">
              ✍️ AI Writing Tips
            </div>
            <ul className="space-y-1 text-blue-800 text-sm">
              <li>• Start sentences to get completion suggestions</li>
              <li>• Write topic headers for section suggestions</li>
              <li>
                • Use descriptive prompts like "The benefits of..." for
                structured content
              </li>
              <li>
                • Higher temperature (0.8-1.0) for creative content, lower
                (0.2-0.4) for technical
              </li>
              <li>
                • Press Tab to accept suggestions, continue typing to ignore
                them
              </li>
            </ul>
          </div>
        </div>
      </ReactQueryProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue(
      /# The Future of Web Development/
    );

    await expect(textarea).toBeInTheDocument();

    // Test AI toggle
    const aiToggle = canvas.getByRole('checkbox');
    await userEvent.click(aiToggle);
    await expect(canvas.getByText('AI Disabled')).toBeInTheDocument();
  },
};

/**
 * ### Code Documentation Assistant
 *
 * AI-powered assistance for writing code comments and documentation.
 */
export const CodeDocumentation: Story = {
  render: () => {
    const [docComment, setDocComment] = useState(
      '/**\n * Calculates the optimal route between multiple waypoints\n * @param waypoints Array of coordinate objects\n * @param'
    );
    const [isActive, setIsActive] = useState(true);

    return (
      <ReactQueryProvider>
        <div className="w-full max-w-3xl space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-lg">
                Code Documentation Assistant
              </h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">AI Assistance</span>
              </label>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block font-medium text-sm">
                  JSDoc Comment
                </label>
                <AutoCompleteTextarea
                  value={docComment}
                  onChange={(e) => setDocComment(e.target.value)}
                  isActive={isActive}
                  placeholder="Start writing JSDoc comment..."
                  autoSize={true}
                  maxRows={15}
                  className="w-full rounded-lg border-2 border-gray-300 p-3 font-mono text-sm"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div className="rounded border border-gray-200 bg-gray-50 p-3">
                  <div className="mb-2 font-medium">Common JSDoc Tags</div>
                  <div className="space-y-1 text-gray-600 text-xs">
                    <div>
                      <code>@param</code> - Function parameters
                    </div>
                    <div>
                      <code>@returns</code> - Return value description
                    </div>
                    <div>
                      <code>@throws</code> - Possible exceptions
                    </div>
                    <div>
                      <code>@example</code> - Usage examples
                    </div>
                    <div>
                      <code>@since</code> - Version information
                    </div>
                  </div>
                </div>

                <div className="rounded border border-green-200 bg-green-50 p-3">
                  <div className="mb-2 font-medium">AI Assistance Benefits</div>
                  <div className="space-y-1 text-green-700 text-xs">
                    <div>• Parameter type inference</div>
                    <div>• Return type suggestions</div>
                    <div>• Example code generation</div>
                    <div>• Error case documentation</div>
                    <div>• Best practice compliance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <div className="mb-2 font-medium text-sm text-yellow-800">
              💡 Documentation Tips
            </div>
            <ul className="space-y-1 text-sm text-yellow-700">
              <li>
                • Start with function purpose, then add parameter descriptions
              </li>
              <li>• Include @example blocks for complex functions</li>
              <li>• Describe edge cases and error conditions</li>
              <li>• Use consistent formatting for better readability</li>
            </ul>
          </div>
        </div>
      </ReactQueryProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue(/\/\*\*/);

    await expect(textarea).toBeInTheDocument();

    // Add more content to trigger potential suggestions
    await userEvent.click(textarea);
    await userEvent.keyboard('{End}');
    await userEvent.type(
      textarea,
      ' options Configuration object for route calculation'
    );
  },
};

/**
 * ### Email Composition Assistant
 *
 * Professional email writing with AI assistance for tone and content.
 */
export const EmailAssistant: Story = {
  render: () => {
    const [emailContent, setEmailContent] = useState(
      'Subject: Project Update\n\nHi Sarah,\n\nI wanted to update you on the progress of our design system project.'
    );
    const [tone, setTone] = useState('professional');
    const [isAiEnabled, setIsAiEnabled] = useState(true);

    const tones = [
      { value: 'professional', label: 'Professional', color: 'blue' },
      { value: 'friendly', label: 'Friendly', color: 'green' },
      { value: 'formal', label: 'Formal', color: 'purple' },
      { value: 'casual', label: 'Casual', color: 'orange' },
    ];

    const getToneColor = (toneValue: string) => {
      const toneObj = tones.find((t) => t.value === toneValue);
      return toneObj?.color || 'gray';
    };

    const wordCount = emailContent
      .split(/\s+/)
      .filter((word) => word.length > 0).length;

    return (
      <ReactQueryProvider>
        <div className="w-full max-w-4xl space-y-6">
          {/* Email Header */}
          <div className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
              <div>
                <h3 className="font-semibold text-lg">AI Email Assistant</h3>
                <div className="text-gray-600 text-sm">{wordCount} words</div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isAiEnabled}
                    onChange={(e) => setIsAiEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">AI Writing Assistant</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Tone:</span>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="rounded border border-gray-300 px-2 py-1 text-sm"
                  >
                    {tones.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Email Composer */}
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="border-gray-200 border-b bg-gray-50 px-4 py-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`rounded-full px-2 py-1 font-medium text-xs ${
                    isAiEnabled
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {isAiEnabled ? 'AI Enabled' : 'AI Disabled'}
                </span>

                <span className="text-gray-600">Tone:</span>
                <span
                  className={`rounded-full px-2 py-1 font-medium text-xs bg-${getToneColor(tone)}-100 text-${getToneColor(tone)}-800`}
                >
                  {tones.find((t) => t.value === tone)?.label}
                </span>
              </div>
            </div>

            <div className="p-6">
              <AutoCompleteTextarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                isActive={isAiEnabled}
                placeholder="Compose your email..."
                autoSize={true}
                maxRows={15}
                className="min-h-[300px] w-full resize-none border-0 text-base leading-relaxed focus:outline-none focus:ring-0"
                variant={InputVariant.INVISIBLE}
              />
            </div>

            <div className="border-gray-200 border-t bg-gray-50 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="text-gray-600 text-sm">
                  Press Tab to accept AI suggestions • Shift+Enter for line
                  breaks
                </div>

                <div className="flex gap-2">
                  <button className="rounded border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-100">
                    Save Draft
                  </button>
                  <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Email Tips */}
          <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
            <div className="mb-2 font-medium text-indigo-900 text-sm">
              📧 Email Writing Tips
            </div>
            <div className="grid grid-cols-1 gap-4 text-indigo-800 text-sm md:grid-cols-2">
              <ul className="space-y-1">
                <li>• Start with clear subject line</li>
                <li>• Use appropriate greeting for relationship</li>
                <li>• State purpose early in the email</li>
                <li>• Be concise but complete</li>
              </ul>
              <ul className="space-y-1">
                <li>• Include clear call-to-action if needed</li>
                <li>• Professional signature and contact info</li>
                <li>• Proofread before sending</li>
                <li>• Match tone to recipient and context</li>
              </ul>
            </div>
          </div>
        </div>
      </ReactQueryProvider>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textarea = canvas.getByDisplayValue(/Subject: Project Update/);

    await expect(textarea).toBeInTheDocument();

    // Test tone selector
    await expect(canvas.getAllByText('Professional')[0]).toBeInTheDocument();
    const toneSelect = canvas.getByDisplayValue('Professional');
    await userEvent.selectOptions(toneSelect, 'Friendly');
    await expect(canvas.getAllByText('Friendly')[0]).toBeInTheDocument();
    await userEvent.selectOptions(toneSelect, 'Formal');
    await expect(canvas.getAllByText('Formal')[0]).toBeInTheDocument();
    await userEvent.selectOptions(toneSelect, 'Casual');
    await expect(canvas.getAllByText('Casual')[0]).toBeInTheDocument();
  },
};
