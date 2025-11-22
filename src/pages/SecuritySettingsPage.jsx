import { useState, useEffect } from 'react'
import { Shield, Mail, Smartphone, Lock, UserX, Flag, Key, CheckCircle, XCircle, AlertTriangle, Download } from 'lucide-react'
import { securityAPI } from '../services/api'

function SecuritySettingsPage() {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [show2FAModal, setShow2FAModal] = useState(false)
  const [qrCode, setQrCode] = useState(null)
  const [backupCodes, setBackupCodes] = useState([])
  const [verifyCode, setVerifyCode] = useState('')
  const [blockedUsers, setBlockedUsers] = useState([])
  const [reports, setReports] = useState([])

  useEffect(() => {
    loadSecuritySettings()
    loadBlockedUsers()
    loadReports()
  }, [])

  const loadSecuritySettings = async () => {
    try {
      const { data } = await securityAPI.getSecuritySettings()
      setSettings(data)
    } catch (error) {
      console.error('Error loading security settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadBlockedUsers = async () => {
    try {
      const { data } = await securityAPI.getBlockedUsers()
      setBlockedUsers(data)
    } catch (error) {
      console.error('Error loading blocked users:', error)
    }
  }

  const loadReports = async () => {
    try {
      const { data } = await securityAPI.getMyReports()
      setReports(data)
    } catch (error) {
      console.error('Error loading reports:', error)
    }
  }

  const handleSetup2FA = async () => {
    try {
      const { data } = await securityAPI.setup2FA()
      setQrCode(data.qrCode)
      setBackupCodes(data.backupCodes)
      setShow2FAModal(true)
    } catch (error) {
      alert('Error setting up 2FA: ' + error.message)
    }
  }

  const handleVerify2FA = async () => {
    try {
      await securityAPI.verify2FA(verifyCode)
      alert('2FA enabled successfully!')
      setShow2FAModal(false)
      loadSecuritySettings()
    } catch (error) {
      alert('Invalid verification code')
    }
  }

  const handleDisable2FA = async () => {
    const password = prompt('Enter your password to disable 2FA:')
    if (!password) return

    try {
      await securityAPI.disable2FA(password)
      alert('2FA disabled successfully')
      loadSecuritySettings()
    } catch (error) {
      alert('Error disabling 2FA: ' + error.message)
    }
  }

  const handleResendVerification = async () => {
    try {
      await securityAPI.resendVerification()
      alert('Verification email sent! Check your inbox.')
    } catch (error) {
      alert('Error sending email: ' + error.message)
    }
  }

  const handleUnblockUser = async (userId) => {
    try {
      await securityAPI.unblockUser(userId)
      alert('User unblocked successfully')
      loadBlockedUsers()
    } catch (error) {
      alert('Error unblocking user: ' + error.message)
    }
  }

  const downloadBackupCodes = () => {
    const text = backupCodes.join('\n')
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'plated-backup-codes.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading security settings...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Shield className="text-primary-600" size={32} />
            Security Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account security and privacy settings
          </p>
        </div>

        {/* Email Verification */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Email Verification
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Verify your email address to access all features
                </p>
                <div className="mt-3">
                  {settings?.isVerified ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="font-medium">Email Verified</span>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center gap-2 text-red-600 mb-3">
                        <XCircle size={20} />
                        <span className="font-medium">Email Not Verified</span>
                      </div>
                      <button
                        onClick={handleResendVerification}
                        className="btn-secondary text-sm"
                      >
                        Resend Verification Email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="card p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Smartphone className="text-purple-600 mt-1" size={24} />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Two-Factor Authentication
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Add an extra layer of security to your account
                </p>
                <div className="mt-3">
                  {settings?.twoFactorEnabled ? (
                    <div>
                      <div className="flex items-center gap-2 text-green-600 mb-3">
                        <CheckCircle size={20} />
                        <span className="font-medium">2FA Enabled</span>
                      </div>
                      <button
                        onClick={handleDisable2FA}
                        className="btn-secondary text-sm"
                      >
                        Disable 2FA
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleSetup2FA}
                      className="btn-primary text-sm"
                    >
                      Enable 2FA
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Security */}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4">
            <Lock className="text-yellow-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Login Security
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Monitor login activity and security status
              </p>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Failed Login Attempts</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {settings?.loginAttempts || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Login IP</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {settings?.lastLoginIP || 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Last Login Device</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {settings?.lastLoginDevice || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blocked Users */}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4">
            <UserX className="text-red-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Blocked Users ({blockedUsers.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage users you've blocked
              </p>
              <div className="mt-4 space-y-2">
                {blockedUsers.length === 0 ? (
                  <p className="text-sm text-gray-500">No blocked users</p>
                ) : (
                  blockedUsers.map(user => (
                    <div key={user._id} className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.fullName}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                          <p className="text-sm text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleUnblockUser(user._id)}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Unblock
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reports */}
        <div className="card p-6 mb-6">
          <div className="flex items-start gap-4">
            <Flag className="text-orange-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                My Reports ({reports.length})
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                View reports you've submitted
              </p>
              <div className="mt-4 space-y-2">
                {reports.length === 0 ? (
                  <p className="text-sm text-gray-500">No reports submitted</p>
                ) : (
                  reports.slice(0, 5).map(report => (
                    <div key={report._id} className="py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                            {report.reportType} - {report.reason.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(report.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          report.status === 'reviewing' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Tips */}
        <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-blue-600 mt-1" size={24} />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                Security Tips
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li>✓ Enable two-factor authentication for maximum security</li>
                <li>✓ Use a strong, unique password</li>
                <li>✓ Never share your password or backup codes</li>
                <li>✓ Verify your email address</li>
                <li>✓ Report suspicious activity immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Setup Two-Factor Authentication</h3>
            
            {qrCode && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                </p>
                <div className="bg-white p-4 rounded-lg mb-4">
                  <img src={qrCode} alt="QR Code" className="w-full" />
                </div>
              </>
            )}

            {backupCodes.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium">Backup Codes</p>
                  <button
                    onClick={downloadBackupCodes}
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-xs font-mono max-h-40 overflow-y-auto">
                  {backupCodes.map((code, i) => (
                    <div key={i}>{code}</div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Save these codes in a safe place. You'll need them if you lose your phone.
                </p>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Enter Verification Code</label>
              <input
                type="text"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}
                className="input-field"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleVerify2FA}
                className="btn-primary flex-1"
                disabled={verifyCode.length !== 6}
              >
                Verify & Enable
              </button>
              <button
                onClick={() => setShow2FAModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecuritySettingsPage
