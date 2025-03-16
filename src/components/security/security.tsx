const securityAdvisories = [
  {
    title: 'Access Control Warning',
    message:
      'Access to certain Kafka topics may be restricted based on user permissions. Attempting to consume unauthorized topics may result in access errors.',
  },
  {
    title: 'Sensitive Data Warning',
    message:
      'Some topics may contain sensitive or confidential information. Ensure you have the appropriate authorization before consuming any data.',
  },
  {
    title: 'Audit Logging Notice',
    message:
      'All consumption actions may be logged for auditing purposes. Unauthorized access attempts will be recorded.',
  },
  {
    title: 'Data Retention Advisory',
    message:
      'Messages in Kafka topics may have limited retention periods. Ensure you consume data promptly if retention policies apply.',
  },
  {
    title: 'Message Integrity Warning',
    message:
      'Messages from topics may not be validated for integrity. Verify data sources before making critical decisions based on consumed messages.',
  },
  {
    title: 'Network Security Notice',
    message:
      'Consuming messages from unsecured networks may expose data to interception. Use secure connections (TLS) when possible.',
  },
  {
    title: 'Resource Consumption Alert',
    message:
      'High-frequency consumption may impact system performance or trigger rate limits. Be mindful of resource usage.',
  },
]

export const Security = () => (
  <div className="flex h-full flex-col p-4">
    <ol className="pl-4">
      {securityAdvisories.map(({ title, message }, i) => (
        <li
          key={title}
          className="opacity-fade-in mb-4 list-decimal"
          style={{
            animationDelay: `${i * 30}ms`,
          }}
        >
          <h2 className="mb-2 font-bold">{title}</h2>
          <p>{message}</p>
        </li>
      ))}
    </ol>
  </div>
)
